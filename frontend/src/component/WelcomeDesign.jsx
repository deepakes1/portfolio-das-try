
import { Button } from "@/components/ui/button";
import BoxReveal from "../components/ui/box-reveal";

  function Welcome({onStart}) {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden p-10 md:pt-8">
      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <p className="text-[2.5rem] lg:text-[3.5rem]  font-semibold">
          Welcome to the Portfolio Creator <span className="text-white">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          Create a stunning portfolio to showcase your skills and projects!
          
        </h2>
      </BoxReveal>

      

      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <Button className="mt-[1.6rem]  bg-black text-green-100 px-6 py-3 rounded transition-all hover:rounded-3xl hover:bg-slate-300 hover:text-black" onClick={onStart}>Start Creating</Button>
      </BoxReveal>
    </div>
  );
}

export default Welcome;