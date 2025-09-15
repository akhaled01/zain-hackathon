import { SignUp } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

const Page = () => (
  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
    <SignUp
      routing="hash"
      appearance={{
        theme: shadcn,
      }}
      fallbackRedirectUrl="/more-info"
    />
  </div>
);

export default Page;
