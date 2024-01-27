import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
export { useForm } from "react-hook-form";
export { zodResolver as validatorResolver } from "@hookform/resolvers/zod";
export * as validator from "zod";
