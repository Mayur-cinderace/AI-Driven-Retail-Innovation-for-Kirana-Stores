"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { generateSmartHints, type SmartHintsInput } from "@/ai/flows/generate-smart-hints";

const loginSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be 10 digits." })
    .max(10, { message: "Mobile number must be 10 digits." })
    .regex(/^\d+$/, { message: "Invalid mobile number." }),
  role: z.enum(["User", "Admin"], {
    required_error: "Please select a role.",
  }),
});

type LoginValues = z.infer<typeof loginSchema>;

type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
};

export function LoginCard() {
  const { toast } = useToast();
  const [hint, setHint] = useState<string>("");
  const [isHintLoading, setIsHintLoading] = useState<boolean>(true);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobileNumber: "",
      role: "User",
    },
  });

  const selectedRole = form.watch("role");

  useEffect(() => {
    // This check ensures the code runs only on the client
    if (typeof window !== 'undefined') {
      setTimeOfDay(getTimeOfDay());
    }
  }, []);

  useEffect(() => {
    if (!timeOfDay) return;
    const fetchHint = async () => {
      setIsHintLoading(true);
      try {
        const input: SmartHintsInput = { role: selectedRole, timeOfDay };
        const result = await generateSmartHints(input);
        setHint(result.hint);
      } catch (error) {
        console.error("Error fetching smart hint:", error);
        setHint("Could not load a hint right now. Please try again later.");
      } finally {
        setIsHintLoading(false);
      }
    };

    fetchHint();
  }, [selectedRole, timeOfDay]);

  function onSubmit(data: LoginValues) {
    console.log(data);
    toast({
      title: "Login Attempted",
      description: `Role: ${data.role}, Mobile: ${data.mobileNumber}`,
    });
  }

  return (
    <Card className="w-full max-w-md animate-fade-in-up rounded-2xl border-border/20 bg-card/60 shadow-2xl backdrop-blur-lg transition-all duration-700">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Log in to manage your Kirana Stores inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      {...field}
                      className="bg-background/80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background/80">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Login with OTP
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline hover:text-primary">
            Sign up
          </Link>
        </div>
        <div className="mt-6 rounded-lg bg-primary/10 p-4 text-sm text-primary-foreground">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="font-semibold">
                {timeOfDay ? `${timeOfDay} Tip for ${selectedRole}s` : "Tip"}
              </p>
              {isHintLoading || !timeOfDay ? (
                <Skeleton className="mt-1 h-4 w-4/5" />
              ) : (
                <p className="text-foreground/80">{hint}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
