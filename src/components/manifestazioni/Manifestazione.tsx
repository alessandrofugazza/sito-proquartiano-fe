interface ManifestazioneProps {
  title: string;
  description: string;
}

function Manifestazione({title, description}: ManifestazioneProps) {
  return(
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  )
}

export default Manifestazione;