import Link from "next/link";

const LoginButton = ({ sm_width = false }) => {
  return (
    <Link href={`/login`}>
      <div
        className={`${
          sm_width ? "w-20 py-1" : "w-32 py-2"
        } text-center border rounded hover:bg-slate-700`}
      >
        Login
      </div>
    </Link>
  );
};

export default LoginButton;
