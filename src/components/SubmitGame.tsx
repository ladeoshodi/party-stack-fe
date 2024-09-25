import GameForm from "./GameForm";

function SubmitGame() {
  return (
    <>
      <section className="section">
        <h1 className="title has-text-centered">Submit a new game</h1>
      </section>
      <section className="section">
        <GameForm />
      </section>
    </>
  );
}

export default SubmitGame;
