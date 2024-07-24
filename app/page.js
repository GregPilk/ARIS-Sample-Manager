import LoginForm from "./components/loginform";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl my-3">Sign in to Access ARIS Sample Manager</h1>
      <LoginForm />
    </div>
  );
}
