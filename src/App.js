import React, { Component } from "react";

class App extends Component {

  state = {
    addview: true,
    newTitle: "",
    newDescription: "",
    newInput: "",
    alpha: false,
    topics: [],
    eInput: false,
    eDesc: false,
    eTitle: false,
    agenda: [
      {
        title: "Angular",
        description: "Some descroption anbout hte angular",
        topics: ["Introduction", "Typescript", "Under versiom"]
      },
      {
        title: "Vue",
        description: "Some descroption anbout hte angular",
        topics: ["Introduction", "Typescript", "Under versiom"]
      },],
  }

  handleChange = (e) => {
    this.setState((data) => ({
      ...data,
      [e.target.name]: e.target.value
    }));

    ((!e.target.value) && (e.target.name === "newTitle")) ? (this.setState({ eTitle: true })) : (((e.target.value) && (e.target.name === "newTitle")) ? (this.setState({ eTitle: false })) : (console.log(" ")));

    ((!e.target.value) && (e.target.name === "newDescription")) ? (this.setState({ eDesc: true })) : (((e.target.value) && (e.target.name === "newDescription")) ? (this.setState({ eDesc: false })) : (console.log(" ")));

    ((!e.target.value) && (e.target.name === "newInput")) ? (this.setState({ eInput: true })) : (((e.target.value) && (e.target.name === "newInput")) ? (this.setState({ eInput: false })) : (console.log(" ")));
  }

  addTopic = (e) => {
    const topic = this.state.newInput;
    this.state.topics.push(topic);
    this.setState({ newInput: "", alpha: true });
    e.preventDefault();
  }

  toggleView = () => {
    this.state.addview ? (this.setState({ addview: false })) : (this.setState({ addview: true }))
  }

  handleSave = (e) => {
    const agendaAns = {
      title: this.state.newTitle,
      description: this.state.newDescription,
      topics: this.state.topics
    }
    this.state.agenda.push(agendaAns);
    this.setState({
      newTitle: "",
      newDescription: "",
      alpha: false,
      topics: []
    })
    e.preventDefault();
  }

  render() {
    const alpha = this.state.alpha;
    const addAgenda = this.state.addview;
    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>
        {
          addAgenda ? (<div className="container" role="addAgenda">
            <button className="btn btn-info" role="goToView" onClick={this.toggleView}>Click To View Agenda</button>
            <form>
              <div className="my-3">
                <label htmlFor="newTitle" className="form-label">Title</label>
                <input type="text"
                  name="newTitle"
                  placeholder="Enter the title"
                  className="form-control"
                  role="inputTitle"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.newTitle} />
                <small className="text-danger" data-testid="invalidTitle">
                  {
                    this.state.eTitle ? ("Title is required") : (" ")
                  }
                </small>
              </div>
              <div className="my-3">
                <label htmlFor="newDescription" className="form-label">Description</label>
                <input
                  type="text"
                  name="newDescription"
                  placeholder="Enter the description"
                  className="form-control"
                  role="inputDescription"
                  value={this.state.newDescription}
                  onChange={(e) => this.handleChange(e)} />
                <small className="text-danger" data-testid="invalidDescription">
                  {
                    (this.state.eDesc) ? ("Description is required") : (" ")
                  }
                </small>
              </div>
              <div className="my-3 w-50">
                <label htmlFor="newInput" className="form-label">Enter topic</label>
                <input
                  type="text"
                  name="newInput"
                  placeholder="Enter the topic"
                  role="inputTopic"
                  className="form-control"
                  value={this.state.newInput}
                  onChange={(e) => this.handleChange(e)} />
                <small className="text-danger" data-testid="invalidDescription">
                  {
                    (this.state.eInput) ? ((this.state.topics.length == 0) ? ("Topic is required") : ("")) : (" ") 
                  }
                </small>
              </div>

              <button className="btn btn-success addAlign" role="addTopicBtn" disabled={!this.state.newInput} onClick={(e) => this.addTopic(e)}>+ Add Topic</button>
              <button className="btn btn-success submitAlign" role="submitAgendaBtn" disabled={(!this.state.newTitle) || (!this.state.newDescription) || (this.state.topics.length === 0)} onClick={(e) => this.handleSave(e)}>Submit Agenda</button>
            </form>
            {
              alpha ? (<div className="card my-3">
                <div className="card-header">Added Topics</div>
                <div className="card-body">
                  <ul className="list-group">
                    {
                      this.state.topics.map((todo, index) => (
                        <li key={index} className="list-group-item">
                          {todo}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="card-footer">Refer the topics you added</div>
              </div>) : (
                <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
                  No Topics Added
                </div>
              )
            }
          </div>) : (
            <div className="container" role="viewAgenda">
              <button className="btn btn-info" role="goToAdd" onClick={this.toggleView}>Click TO Add Agenda</button>
              {
                this.state.agenda.map((todo, index) => (
                  <div className="card my-3" role="cards" key={index}>
                    <div className="card-header">
                      {todo.title}
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        {
                          todo.topics.map((info, ind) => (
                            <li className="list-group-item" key={ind}>
                              {info}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div className="card-footer">
                      {todo.description}
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    )
  }
}
export default App;