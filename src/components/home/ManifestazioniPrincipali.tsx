import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../styles/ManifestazioniPrincipali.scss'

function ManifestazioniPrincipali() {
  return(
    <div style={{marginBlock: '5em'}} className='manifestazioni-principali'>
      <h2 className="text-center mb-4">Manifestazioni principali</h2>
      <Tabs
        defaultActiveKey="mercatino-dei-libri"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="mercatino-dei-libri" title="Mercatino dei libri">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil fugit architecto autem at natus labore, cum vitae distinctio magnam cupiditate? Nihil laborum non amet magnam vitae ipsa in sunt.
          Dolore exercitationem aliquam rerum veniam eum dignissimos hic eius assumenda optio, quasi saepe incidunt explicabo doloribus odit beatae, repellat adipisci deleniti ut! Vero reiciendis facilis optio harum aliquam. Dolorum, perferendis?
          Officia velit illo consectetur iste animi porro facilis aperiam modi nulla. Architecto fugit blanditiis repellendus. Itaque alias minus, necessitatibus, nesciunt provident ad harum, animi temporibus eveniet pariatur similique laboriosam natus?
        </Tab>
        <Tab eventKey="sagra" title="Sagra">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis nihil vitae optio magni. Ad saepe amet perspiciatis voluptatibus tempora sit consequatur sunt id tenetur illo? Deserunt unde culpa pariatur eius.
          Autem, repellendus! Consectetur, ipsum. Accusantium soluta iusto, nesciunt voluptates qui illo similique sunt molestias optio eum harum maxime quibusdam, iste, libero nihil et. Minus voluptas labore aperiam animi velit odio?
          Placeat alias assumenda eius laudantium libero pariatur corrupti laboriosam ea doloribus, nulla cum ut rerum obcaecati. Aliquam, laborum, repellat facere cupiditate incidunt, at quas officia pariatur dicta illum necessitatibus architecto.
        </Tab>
        <Tab eventKey="concorso-corale" title="Concorso corale">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, quibusdam nisi eligendi officia cumque sunt doloribus rerum a ab, veniam iste velit, facere odio sapiente commodi alias voluptas dicta voluptate!
          Dolorum atque nihil qui sed laudantium, suscipit excepturi aperiam dolor iusto repellendus numquam minus facere maiores unde fugiat sapiente, voluptates praesentium perspiciatis laborum, ratione cumque. Adipisci, numquam assumenda. Ex, repellendus!
          Vero quis quo voluptatibus enim consequuntur et aperiam adipisci, laudantium quas quisquam debitis doloremque perferendis neque maiores possimus id quaerat vel perspiciatis atque maxime a reiciendis tempore pariatur dolor. Omnis.
        </Tab>
      </Tabs>
    </div>
  )
}

export default ManifestazioniPrincipali;