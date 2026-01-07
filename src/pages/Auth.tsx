import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, GraduationCap, Home, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const authSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type AppRole = 'student' | 'owner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('student');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp, signIn, user, role, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && role) {
      navigate(role === 'student' ? '/student' : '/owner');
    }
  }, [user, role, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate inputs
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Login failed',
            description: error.message,
          });
        }
      } else {
        const { error } = await signUp(email, password, selectedRole);
        if (error) {
          let message = error.message;
          if (message.includes('already registered')) {
            message = 'This email is already registered. Please sign in instead.';
          }
          toast({
            variant: 'destructive',
            title: 'Sign up failed',
            description: message,
          });
        } else {
          toast({
            title: 'Account created!',
            description: 'You are now signed in.',
          });
        }
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
            <span className="text-2xl font-bold text-gradient">Linkmate</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 animate-fade-up">
            <h1 className="text-2xl font-bold text-foreground text-center mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              {isLogin ? 'Sign in to continue' : 'Join Linkmate today'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Role Selection (only for signup) */}
              {!isLogin && (
                <div className="space-y-3">
                  <Label>I am a...</Label>
                  <RadioGroup
                    value={selectedRole}
                    onValueChange={(value) => setSelectedRole(value as AppRole)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="student"
                        id="student"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="student"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <GraduationCap className="mb-2 h-6 w-6" />
                        <span className="font-medium">Student</span>
                        <span className="text-xs text-muted-foreground">Find Rooms</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="owner"
                        id="owner"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="owner"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 cursor-pointer transition-all"
                      >
                        <Home className="mb-2 h-6 w-6" />
                        <span className="font-medium">Owner</span>
                        <span className="text-xs text-muted-foreground">List Rooms</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isLogin ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin ? (
                  <>Don't have an account? <span className="text-primary font-medium">Sign up</span></>
                ) : (
                  <>Already have an account? <span className="text-primary font-medium">Sign in</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
