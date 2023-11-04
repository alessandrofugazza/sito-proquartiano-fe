import { Alert } from "react-bootstrap";
import SectionWrapper from "./SectionWrapper";

function InfoPrivacy() {
  return(
    <>
      <SectionWrapper>
        <h2>Informativa per trattamento di dati personali</h2>
        <p>Documento informativo ai sensi e per gli effetti di cui agli articoli 13-14 del GDPR (General Data Protection Regulation) 2016/679</p>
        <Alert variant="warning">L'informativa non è valida per altri siti web eventualmente consultabili attraverso i nostri link.</Alert>
      </SectionWrapper>
      <SectionWrapper>
        <h3>Chi siamo</h3>
        <p>L'indirizzo del nostro sito web è: <a href="https://www.proquartiano.it">https://www.proquartiano.it</a></p>
      </SectionWrapper>
      <SectionWrapper>
        <h3>Titolare del trattamento</h3>
        <div className="d-flex flex-column align-items-center my-4">
          <strong className="mb-0">Associazione Proquartiano</strong>
          <p className="mb-0">Via IV Novembre 69 - Quartiano di Mulazzano (LO).</p>
        </div>
        <p>In osservanza al Reg CE 679/16 (GDPR), forniamo di seguito le necessarie informazioni in ordine al trattamento dei dati personali eventualmente forniti.</p>
      </SectionWrapper>
      <SectionWrapper>
        <h3>Luogo e finalità di trattamento dei dati</h3>
        <p>I trattamenti connessi ai servizi web di questo sito sono curati da volontari o collaboratori dell'associazione. Nessun dato derivante dal servizio web viene comunicato o diffuso a terzi. I dati personali forniti dagli utenti che inoltrano richieste di servizi sono utilizzati al solo fine di eseguire la prestazione richiesta e non sono comunicati a soggetti terzi salvo che la comunicazione sia imposta da obblighi di legge o sia strettamente necessario per l'adempimento delle richieste.</p>
      </SectionWrapper>
      <h3 className="my-3">Tipi di dati trattati</h3>
      <SectionWrapper>
        <h4>Dati di navigazione</h4>
        <p>I sistemi informatici e le procedure software preposte al funzionamento di questo sito web acquisiscono, nel corso del loro normale esercizio alcuni dati personali la cui trasmissione è implicita nell'uso dei protocolli di comunicazione di internet. Si tratta di informazioni che non sono raccolte per essere associate a interessati identificati, ma che per loro stessa natura potrebbero, attraverso elaborazioni ed associazioni con dati detenuti da terzi, permettere di identificare gli utenti. In questa categoria di dati rientrano gli indirizzi IP o i nomi a dominio dei computer utilizzati dagli utenti che si connettono al sito, gli indirizzi in notazione URI (Uniform Resource Identifier) delle risorse richieste, l'orario della richiesta, il metodo utilizzato nel sottoporre la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta data dal server (buon fine, errore ..) ed altri parametri relativi al sistema operativo e all'ambiente informatico dell'utente. Questi dati vengono utilizzati al solo fine di ricavare informazioni statistiche anonime sull'uso del sito e per controllarne il corretto funzionamento e vengono cancellati immediatamente dopo l'elaborazione. I dati potrebbero essere utilizzati per l'accertamento di responsabilità in caso di ipotetici reati informatici ai danni del sito.</p>
      </SectionWrapper>
      <SectionWrapper>
        <h4>Dati forniti volontariamente dagli utenti</h4>
        <p>L'invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta la successiva acquisizione dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti nella missiva. Sintetiche informative di sintesi verranno riportate o visualizzate nelle pagine del sito predisposte per particolari servizi.</p>
      </SectionWrapper>
      <SectionWrapper>
        <h4>Media</h4>
        <p>Caricando immagini sul sito web, si dovrebbe evitare di caricare immagini che includano i dati di posizione incorporati (EXIF GPS). I visitatori del sito web possono scaricare ed estrarre qualsiasi dato sulla posizione dalle immagini sul sito web.</p>
      </SectionWrapper>
      <SectionWrapper>
        <h4>Contenuto incorporato da altri siti web</h4>
        <p>Gli articoli su questo sito possono includere contenuti incorporati (ad esempio video, immagini, articoli, ecc.). I contenuti incorporati da altri siti web si comportano esattamente allo stesso modo come se il visitatore avesse visitato l'altro sito web.</p>
        <Alert variant="warning"><strong>Nota bene:</strong> Questi siti web possono raccogliere dati, usare cookie, integrare ulteriori tracciamenti di terze parti e monitorare l'interazione con essi, incluso il tracciamento della tua interazione con il contenuto incorporato se si ha un account e si è connessi a quei siti web.</Alert>
      </SectionWrapper>
      <SectionWrapper>
        <h3>Facoltatività del conferimento dei dati</h3>
        <p>A parte quanto specificato per i dati di navigazione, l'utente è libero di fornire i dati personali per richiedere le prestazione offerte dall'Associazione. Il loro mancato conferimento può comportare l'impossibilità di ottenere la prestazione richiesta.</p>
      </SectionWrapper>
      <SectionWrapper>
        <h3>Modalità di trattamento dei dati</h3>
        <p>I dati personali sono trattati con strumenti informatici automatizzati, per il tempo necessario a conseguire lo scopo per il quale sono stati raccolti. Specifiche misure di sicurezza sono osservate per prevenire la perdita dei dati, usi illeciti o non corretti ed accessi non autorizzati.</p>
      </SectionWrapper>
      <SectionWrapper>
        <h3>Diritti degli interessati</h3>
        <p>I soggetti cui si riferiscono i dati hanno i diritti previsti dall'art. 7 del Codice privacy che prevede, tra gli altri il diritto di conoscere la presenza dei suoi dati e di ottenere la cancellazione, la rettifica, l'aggiornamento dei dati stessi rivolgendosi a:</p>
      </SectionWrapper>
      <div className="d-flex flex-column align-items-center">
        <strong className="mb-0">Associazione Proquartiano</strong>
        <p className="mb-0">Via IV Novembre, 69</p>
        <p className="mb-0">26837 - Quartiano di Mulazzano LO</p>
      </div>
    </>
  )
}

export default InfoPrivacy;