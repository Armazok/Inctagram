import Link from "next/link";
import EmailConfirmationImg from "../../../assets/images/bro.svg";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { authAPI } from "@/services/api/auth/authAPI";

const RegistrationConfirmation: FC = () => {
  const { push, query } = useRouter();
  const { isLoading, isError } = useQuery({
    queryKey: ["regConfirmation"],
    queryFn: () => authAPI.registrationConfirmation({ confirmationCode: String(query.code) }),
    enabled: !!query.code,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    retry: false
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    push("/auth/registration-email-resending");
  }

  return (
    <div className={"flex justify-center items-center flex-col text-light-100 h-screen"}>
      <span className={"font-bold mt-6 mb-3"}>Congratulations!</span>
      <br />
      <span className={"mb-12"}>Your email has been confirmed</span>
      <Link
        className={
          "hover:no-underline hover:text-light-100 hover:bg-accent-100 text-light-100 inline-block text-center bg-accent-500 px-6 py-1.5 rounded-sm item leading-6"
        }
        href={"/"}
      >
        Sign in
      </Link>
      <Image className={"mt-20"} src={EmailConfirmationImg} alt={"bro"} height={432} width={300} />
    </div>
  );
};

export default RegistrationConfirmation;