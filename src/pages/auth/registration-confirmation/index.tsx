import Link from "next/link";
import EmailConfirmationImg from "../../../assets/images/bro.svg";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/router";
import Preloader from "@/components/atoms/preloader/Preloader";
import RegistrationEmailResending from "@/modules/registration-email-resending";
import { useUserStore } from "@/store";
import { useRegistrationConfirmationQuery, useRegistrationEmailResendingMutation } from "@/services/api/auth/hoook";

const RegistrationConfirmation: FC = () => {
  const { query } = useRouter();
  const { isLoading, isError } = useRegistrationConfirmationQuery(String(query.code))
  const { email } = useUserStore();
  const { mutate: resendLink } = useRegistrationEmailResendingMutation(email);

  if (isLoading) {
    return <div className={"flex justify-center items-center h-screen"}>
      <Preloader />
    </div>;
  }

  if (isError) {
    return <RegistrationEmailResending callback={resendLink} />;
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