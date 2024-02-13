import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fullNamesConcat(firstName: string | null, lastName: string | null) {
  if (firstName != "" && lastName != "") {
    return `${firstName} ${lastName}`
  } else {
    return firstName || lastName
  }
}

export function ETCurrencyIdToName(id:number){
  switch(id){
    case 1:
      return "USD";
    case 2:
      return "EUR";
    case 3:
      return "GBP";
    case 4:
      return "NGN";
    case 5:
      return "INR";
    default:
      return "USD";
  }
}