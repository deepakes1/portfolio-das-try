// import { Button } from "@/components/ui/button";
// import BoxReveal from "@/components/magicui/box-reveal";


// function Welcome({ onStart }) {
//   return (
//     <div className='flex flex-col justify-center items-center text-center'  style={{ height: 'calc(100vh - 64px)' }}>
//       <h1 className='mb-4 text-2xl font-black '>Welcome to the Portfolio Creator</h1>
//       <p className='mb-4 text-lg '>Create a stunning portfolio to showcase your skills and projects!</p>
//       <button
//         onClick={onStart}
//         className='bg-black text-green-100 px-6 py-3 rounded transition-all hover:rounded-3xl hover:bg-slate-300 hover:text-black'
//       >
//         Start Creating
//       </button>
//     </div>
//   );
// }




// export default Welcome;




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