import { supabase } from "@/services/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import LoaderSVG from "@/assets/icons/loader.svg?react";
import { useAppStore } from "@/context";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="min-h-dvh flex flex-col justify-center">
      <div className="w-11/12 m-auto">
        <h3 className="text-2xl font-base text-center mb-6">Signup</h3>
        <form>
          <Input
            type="text"
            className="my-3"
            autoComplete="off"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            className="my-3"
            autoComplete="off"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            type="email"
            className="my-3"
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="tel"
            className="my-3"
            autoComplete="off"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem value={currency.currency_code}>
                  {currency.currency_code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="password"
            className="my-3"
            autoComplete="off"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            className="my-3"
            autoComplete="off"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="button" size="lg" className="w-full my-2">
            {isLoading &&
              <LoaderSVG className="mr-2 h-4 w-4 animate-spin" />}Signup
          </Button>
        </form>
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
