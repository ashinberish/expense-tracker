import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import LoaderSVG from "@/assets/icons/loader.svg?react";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signupFormSchema = z.object({
    firstName: z.string().min(2, {
      message: "Please enter your first name",
    }),
    lastName: z.string().optional(),
    phoneNumber: z.number().min(1, {
      message: "Please enter your phone number",
    }),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const currencies = [
    {
      id: 1,
      currency_code: "USD",
    },
    {
      id: 2,
      currency_code: "EUR",
    },
    {
      id: 3,
      currency_code: "GBP",
    },
    {
      id: 4,
      currency_code: "NGN",
    },
    {
      id: 5,
      currency_code: "INR",
    },
  ];

  const handleSignup = (values:z.infer<typeof signupFormSchema>) =>{
    console.log(values)
  }

  return (
    <div className="min-h-dvh flex flex-col justify-center">
      <div className="w-11/12 m-auto">
        <h3 className="text-2xl font-base text-center mb-6">Signup</h3>
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(handleSignup)}
          >
            <FormField
              control={signupForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full my-2">
              {isLoading &&
                <LoaderSVG className="mr-2 h-4 w-4 animate-spin" />}Signup
            </Button>
          </form>
        </Form>
        <p className="text-center">
          Already have a account?{" "}
          <Button
            variant="link"
            className="px-0"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </p>
      </div>
    </div>
  );
};
