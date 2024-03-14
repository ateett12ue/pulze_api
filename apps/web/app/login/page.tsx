// import * as React from "react";
// import { useMutation, useQuery, gql } from "@apollo/client";
// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";

// import { cn } from "ui/lib/utils";

// //import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "./components/user-auth-form";
// import {
//   // Avatar,
//   // AvatarFallback,
//   // AvatarImage,
//   buttonVariants,
//   Button,
//   Header,
//   Heading,
// } from "ui";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "../../../../packages/ui/components/avatar";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// };

// const App: React.FunctionComponent = () => {
//   return (
//     <>
//       <div className="md:hidden">
//         {/* <Image
//           src="/examples/authentication-light.png"
//           width={1280}
//           height={843}
//           alt="Authentication"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/authentication-dark.png"
//           width={1280}
//           height={843}
//           alt="Authentication"
//           className="hidden dark:block"
//         /> */}
//       </div>
//       <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
//         <Link
//           href="/signup"
//           className={cn(
//             buttonVariants({ variant: "ghost" }),
//             "absolute right-4 top-4 md:right-8 md:top-8"
//           )}
//         >
//           Signup
//         </Link>
//         <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
//           <div className="absolute inset-0 bg-zinc-900" />
//           <div className="relative z-20 flex items-center text-lg font-medium">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="mr-2 h-6 w-6"
//             >
//               <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
//             </svg>
//             Pulze
//           </div>
//           <div className="relative z-20 mt-auto">
//             <blockquote className="space-y-2">
//               <p className="text-lg">
//                 &ldquo;This library has saved me countless hours of work and
//                 helped me deliver stunning designs to my clients faster than
//                 ever before.&rdquo;
//               </p>
//               <footer className="text-sm">Sofia Davis</footer>
//             </blockquote>
//           </div>
//         </div>
//         <div className="lg:p-8">
//           <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//             <div className="flex flex-col space-y-2 text-center">
//               <h1 className="text-2xl font-semibold tracking-tight">
//                 Login to account
//               </h1>
//               <p className="text-sm text-muted-foreground">
//                 Enter your email below to login to your account
//               </p>
//             </div>
//             <UserAuthForm />
//             <p className="px-8 text-center text-sm text-muted-foreground">
//               By clicking continue, you agree to our{" "}
//               <Link
//                 href="/terms"
//                 className="underline underline-offset-4 hover:text-primary"
//               >
//                 Terms of Service
//               </Link>{" "}
//               and{" "}
//               <Link
//                 href="/privacy"
//                 className="underline underline-offset-4 hover:text-primary"
//               >
//                 Privacy Policy
//               </Link>
//               .
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

import * as React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "ui/lib/utils";

//import { buttonVariants } from "@/registry/new-york/ui/button"
import { UserAuthForm } from "./components/user-auth-form";
import {
  // Avatar,
  // AvatarFallback,
  // AvatarImage,
  buttonVariants,
  Button,
  Header,
  Heading,
} from "ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../packages/ui/components/avatar";
import { ForgetPassword } from "./components/forgetPassword";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
import CaughtIcon from "../../icons/FigmaIcon";

const LogIn = () => {
  return (
    <div className="bg-[#F5F3FF] flex flex-col justify-center items-center h-screen">
      <div className="LoginContainer">
        <div className="flex flex-col border-1 border-inherit bg-white w-[450px] h-[450px] justify-center items-center mt-8">
          <div className="absolute top-12">
            <CaughtIcon />
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight py-4">
                Login
              </h1>
            </div>
            <UserAuthForm />
            <button className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl">
              Continue with email
            </button>
            <div className="ml-[70px]">
              <p className="px-8 text-center text-xs text-muted-foreground font-poppins font-light">
                Not on pulze yet?
                <Link
                  href="../signup"
                  className="text-[#8B5CF6] font-bold font-[Inter] text-xs"
                >
                  Signup
                </Link>{" "}
                <ForgetPassword />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-semibold font-[Inter] text-[32px] pt-8">pulze</h1>
      </div>
    </div>
  );
};

export default LogIn;
