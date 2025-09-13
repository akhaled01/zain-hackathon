import { SignIn } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

const Page = () => (
  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
    <SignIn
      routing="hash"
      appearance={{
        theme: shadcn,
      }}
    />
  </div>
);

export default Page;
