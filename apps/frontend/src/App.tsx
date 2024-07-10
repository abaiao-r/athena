import React from "react";
import axios from "axios";

// Define the type for a detail object
interface Detail {
  name: string;
  detail: string;
}

interface AppState {
  details: Detail[];
  user: string;
  quote: string;
  loading: boolean;
  error: string | null;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    details: [],
    user: "",
    quote: "",
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    try {
      const res = await axios.get<Detail[]>("https://localhost:443/wel/");
      this.setState({ details: res.data, loading: false });
    } catch (error) {
      this.setState({ error: error as string, loading: false });
    }
  };

  getColorClass = (index: number) => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "yellow",
    ];
    return colors[index % colors.length];
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<AppState, keyof AppState>);
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:443/wel/", {
        name: this.state.user,
        detail: this.state.quote,
      });
      this.setState({ user: "", quote: "", error: null });
      this.fetchDetails(); // Refresh the list after a successful submission
    } catch (error) {
      this.setState({ error: error as string });
    }
  };

  render() {
    const { details, user, quote, loading, error } = this.state;

    return (
      <div className="container jumbotron">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Author
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Name of the Poet/Author"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={user}
              name="user"
              onChange={this.handleInput}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Your Quote</span>
            </div>
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="Tell us what you think of ....."
              value={quote}
              name="quote"
              onChange={this.handleInput}
            />
          </div>

          <button type="submit" className="btn btn-primary mb-5">
            Submit
          </button>
        </form>

        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#000000",
          }}
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          details.map((detail, index) => (
            <div key={index}>
              <div className="card shadow-lg">
                <div className={"bg-" + this.getColorClass(index) + " card-header"}>
                  Quote {index + 1}
                </div>
                <div className="card-body">
                  <blockquote
                    className={"text-" + this.getColorClass(index) + " blockquote mb-0"}
                  >
                    <h1> {detail.detail} </h1>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">{detail.name}</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
              <span className="border border-primary "></span>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default App;
