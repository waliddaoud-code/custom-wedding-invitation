import { useEffect, useState } from "react";
import { guests } from "./guests";

/* =====================================================
   WEDDING SETTINGS
   ===================================================== */

const WEDDING_DATE = "2026-10-30T19:30:00+01:00";

const COUPLE = {
  bride: "Yousra ",
  groom: "Adem",
};

const WEDDING = {
  date: "30 October 2026",
  time: "19:30",
  venue: "Salle des fêtes préstige",
  location: "Corso, Boumerdes",
  mapsUrl: "https://maps.app.goo.gl/pbWMtQbnVVdC1xmp9",
};

/* =====================================================
   GET GUEST FROM URL
   ===================================================== */

function getGuestFromUrl() {
  const parts = window.location.pathname.split("/").filter(Boolean);

  if (parts.length < 2 || parts[0].toLowerCase() !== "invite") {
    return null;
  }

  const guestId = decodeURIComponent(parts[1]).toLowerCase();

  return guests[guestId] || null;
}

/* =====================================================
   COUNTDOWN
   ===================================================== */

function Countdown() {
  const weddingDate = new Date(WEDDING_DATE).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = weddingDate - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          finished: true,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),

        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),

        minutes: Math.floor((difference / (1000 * 60)) % 60),

        seconds: Math.floor((difference / 1000) % 60),

        finished: false,
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (timeLeft.finished) {
    return (
      <div className="countdown-finished">
        Aujourd'hui est notre jour de mariage ❤️
      </div>
    );
  }

  return (
    <div className="countdown">
      <div className="time-box">
        <img className="circle" src="/circle.png" alt="Circle" />

        <span>{timeLeft.days}</span>

        <small>Jours</small>
      </div>

      <div className="time-box">
        <img className="circle" src="/circle.png" alt="Circle" />

        <span>{String(timeLeft.hours).padStart(2, "0")}</span>

        <small>Heures</small>
      </div>

      <div className="time-box">
        <img className="circle" src="/circle.png" alt="Circle" />

        <span>{String(timeLeft.minutes).padStart(2, "0")}</span>

        <small>Minutes</small>
      </div>

      <div className="time-box">
        <img className="circle" src="/circle.png" alt="Circle" />

        <span>{String(timeLeft.seconds).padStart(2, "0")}</span>

        <small>Secondes</small>
      </div>
    </div>
  );
}

/* =====================================================
   CRYSTAL ENVELOPE
   ===================================================== */

function CrystalEnvelope({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;

    setOpening(true);

    /*
      Start music after user interaction.
      The music file must be:

      public/music.mp3
    */

    const audio = new Audio("/music.mp3");

    audio.loop = true;

    audio.volume = 0.65;

    audio.play().catch(() => {
      console.log("Music could not start.");
    });

    /*
      Wait until the envelope
      animation finishes.
    */

    setTimeout(() => {
      onOpen();
    }, 2600);
  };

  return (
    <main className={`envelope-screen ${opening ? "opening" : ""}`}>
      <div className="envelope-scene">
        <div className="envelope-glow" />

        <div className="crystal-envelope" onClick={handleOpen}>
          {/* LETTER */}
          <div className="hidden-letter">
            <div className="letter-content">
              <span>{COUPLE.groom}</span>

              <small>&</small>

              <span>{COUPLE.bride}</span>
            </div>
          </div>

          {/* ENVELOPE BODY */}

          <div className="envelope-body">
            <div className="crystal-reflection reflection-one" />

            <div className="crystal-reflection reflection-two" />
          </div>

          {/* FLAP */}

          <div className="envelope-flap">
            <div className="flap-glass" />
          </div>

          {/* SEAL */}

          <div className="envelope-seal">
            <img src="/wax-seal.png" alt="Wax Seal" />
          </div>
        </div>
        <div className="butterfly">
          <div className="wing wing-left"></div>
          <div className="body"></div>
          <div className="wing wing-right"></div>
        </div>

        <div className="open-text">
          <span>Appuyer pour ouvrir</span>

          <small>votre invitation </small>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   INVITATION
   ===================================================== */

function Invitation({ guestName }) {
  return (
    <main className="invitation">
      <div className="invitation-card">
        <div className="decoration">
          <img className="top-left" src="/flowerleft.png" alt="" />
          <img className="top-right" src="/flowerleft.png" alt="" />
        </div>

        <div className="top-decoration">
          <img className="flower1" src="/flower1.png " alt="" />
          <img className="flower-bottom" src="/flower-bottom.png " alt="" />
        </div>

        <p className="small-title">AVEC LA BÉNÉDICTION DE LEURS FAMILLES</p>

        <h1 className="couple-names">
          <span>{COUPLE.groom}</span>

          <span className="ampersand">&</span>

          <span>{COUPLE.bride}</span>
        </h1>

        <div className="divider">
          <span>✦</span>
        </div>

        <p className="dear">À notre cher invité,</p>

        <h2 className="guest-name">{guestName}</h2>

        <p className="message">
          C’est avec une immense joie que nous vous invitons à partager avec
          nous le bonheur de notre mariage.
        </p>

        <p className="message">
          Votre présence à nos côtés rendra cette journée encore plus précieuse
          et restera gravée dans nos cœurs.
        </p>

        <div className="wedding-details">
          <div className="detail">
            <span className="detail-label">DATE</span>

            <strong>{WEDDING.date}</strong>
          </div>

          <div className="detail">
            <span className="detail-label">HEURE</span>

            <strong>{WEDDING.time}</strong>
          </div>

          <div className="detail">
            <span className="detail-label">LIEU</span>

            <a
              href={WEDDING.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-link"
            >
              {WEDDING.venue}
              <small> (Cliquez pour voir sur Google Maps)</small>
            </a>

            <span className="location">{WEDDING.location}</span>
          </div>
        </div>

        <div className="divider">
          <span>✦</span>
        </div>

        <p className="countdown-title">LE GRAND JOUR APPROCHE</p>

        <Countdown />

        <p className="bottom-message">
          Nous avons hâte de vivre cette merveilleuse journée et de la célébrer
          entourés de ceux qui nous sont chers.
        </p>
      </div>
    </main>
  );
}

/* =====================================================
   NOT FOUND
   ===================================================== */

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-card">
        <div className="small-title">WEDDING INVITATION</div>

        <h1>Invitation Not Found</h1>

        <p>Please check that you are using the correct invitation link.</p>
      </div>
    </main>
  );
}

/* =====================================================
   APP
   ===================================================== */

export default function App() {
  const guestName = getGuestFromUrl();

  const [opened, setOpened] = useState(false);

  if (!guestName) {
    return <NotFound />;
  }

  if (!opened) {
    return <CrystalEnvelope onOpen={() => setOpened(true)} />;
  }

  return <Invitation guestName={guestName} />;
}
