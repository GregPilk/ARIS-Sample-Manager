import LoginForm from "./components/loginform";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col justify-center items-center m-4">
        <LoginForm />
      </div>
    </div>
  );
}
