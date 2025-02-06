import  TrueFocus  from '@/components/hero/TrueFocus';
import IntroButton from '@/components/hero/Button';
const Landing = () => {
  return (
  <div className='flex flex-col items-center justify-center h-screen gap-8'>

    <TrueFocus 
sentence="SLM Operations"
manualMode={true}
blurAmount={2}
borderColor="blue"
animationDuration={0.2}
pauseBetweenAnimations={2}
/>

<div className='flex flex-col items-center justify-center gap-2'>
  {/* <h1 className='text-4xl font-bold'>SLM Operations</h1> */}
  <p className='text-lg'>The AI-powered command center for your SLM operations</p>
  <p className='text-md'>start by clicking the button below to chat with the AI</p>

  <div className='mt-2'>
    <IntroButton text="Start" link="/playground/chat" />
  </div>
</div>
    {/* <Link to="/playground/chat">Chat</Link> */}
  </div> 
   
  );
};

export default Landing;