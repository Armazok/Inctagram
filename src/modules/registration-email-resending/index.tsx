import Image from "next/image";
import EmailResendingImg from "../../assets/images/rafiki.svg";
import { FC } from "react";


type PropsType = {
  callback: () => void
}

const RegistrationEmailResending: FC<PropsType> = ({ callback }) => {
  return (
    <div
      className={"flex justify-center items-center flex-col text-light-100 h-screen"}
    >
      <span className={"font-bold mt-6 mb-3"}>Email verification link expired</span>
      <br />
      <span className={"mb-12 w-96 text-center"}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </span>
      <button
        className={
          "hover:no-underline hover:text-light-100 hover:bg-accent-100 text-light-100 inline-block text-center bg-accent-500 px-6 py-1.5 rounded-sm item leading-6"
        }
        onClick={callback}
      >
        Resend verification link
      </button>
      <Image className={"mt-20"} src={EmailResendingImg} alt={"bro"} height={473} width={353} />

    </div>
  );
};

export default RegistrationEmailResending;