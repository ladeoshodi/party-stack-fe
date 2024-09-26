import { useUser } from "../hooks/useUser";

function Profile() {
  const { user } = useUser();

  return (
    <>
      <section className="section">
        <h1 className="title has-text-centered">User Profile</h1>
        <div className="columns is-vcentered is-centered">
          <div className="column is-one-third flex-center-x">
            <figure className="image is-128x128">
              <img
                src={
                  user?.imageUrl
                    ? user.imageUrl
                    : "https://bulma.io/assets/images/placeholders/128x128.png"
                }
                alt="Image"
              />
            </figure>
          </div>
          <div className="column flex-column-center-x">
            <div className="block">
              <p className="is-size-3 has-text-primary has-text-weight-bold">
                {user?.username}
              </p>
            </div>
            <div className="block">
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button is-medium">Update Profile</button>
                  </div>
                  <div className="level-item">
                    <button className="button is-medium is-link">
                      Change Password
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <hr className="horizontal-rule" />
      <section className="section">
        <h1 className="title has-text-centered">Your Games</h1>
      </section>
      <hr className="horizontal-rule" />
      <section className="section">
        <h1 className="title has-text-centered">Your Comments</h1>
      </section>
      <hr className="horizontal-rule" />
      <section className="section">
        <h1 className="title has-text-centered has-text-danger">DANGER ZONE</h1>
      </section>
      <hr className="horizontal-rule" />
    </>
  );
}

export default Profile;
