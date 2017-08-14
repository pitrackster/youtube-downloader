import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'

// https://www.youtube.com/watch?v=rEuMAqfuCrI

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestData: {
        url: '',
        mode: 'audio'
      },
      objectUrl:null
    }

    this.getFile = this.getFile.bind(this)
  }

  getFile(){
    const myInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(this.state.requestData)
    }

    fetch('http://localhost/Utube-dl/script.php', myInit)
    .then((response) => {
      this.setState({url: ''})
      if (response.ok) {
        console.log('success')
        return response.blob()
      } else {
        console.log('error')
      }
      
    })
    .then((blob) => {
      console.log('end')
      this.setState({objectUrl: URL.createObjectURL(blob)})
    })
  }

  onDownload(){
    URL.revokeObjectURL(this.state.objectUrl)
    this.setState({requestData: null, objectUrl: null})
  }

  render() {
    return(
      <div className="container">
        <div className="form-group">
          <label>Url de la vidéo youtube</label>
          <input className="form-control" type="text" onChange={(e) => 
              this.setState(Object.assign(this.state.requestData, {url: e.target.value}))
            } 
            value={this.state.requestData.url} 
            placeholder="entrer une URL youtube (pas un lien de partage)" />
        </div>

        <div className="radio">
          <label>
            <input 
              onChange={() => 
                this.setState(Object.assign(this.state.requestData, {mode: 'audio'}))
              } 
              type="radio" 
              name="optionsRadios" 
              id="optionsRadios1" 
              value="audio" 
              checked={this.state.requestData.mode === 'audio'} />
              Télécharger uniquement l'audio de la vidéo
          </label>
        </div>
        <div className="radio">
          <label>
            <input 
              onChange={() => 
                this.setState(Object.assign(this.state.requestData, {mode: 'video'}))
              } 
              type="radio" 
              name="optionsRadios" 
              id="optionsRadios2" 
              value="video" 
              checked={this.state.requestData.mode === 'video'}/>
              Télécharger uniquement la vidéo
          </label>
        </div>
        <div className="radio">
          <label>
            <input 
              onChange={() => 
                this.setState(Object.assign(this.state.requestData, {mode: 'both'}))
              }
              type="radio" name="optionsRadios" id="optionsRadios2" value="video" checked={this.state.requestData.mode === 'both'}/>
              Télécharger la vidéo et l'audio dans un fichier séparé (mp3 256Kb/s)
          </label>
        </div>
        
        <button disabled={!this.state.requestData || this.state.requestData.url === ''} onClick={this.getFile} className="btn btn-default">Envoyer</button>
        
        {this.state.objectUrl !== null && 
          <div>
            <hr/>
            <a href={this.state.objectUrl} download="archive.zip">Télécharger</a>
          </div>
        }  
      </div>
      
    )
  }
}

App.propTypes = {}



export default App
