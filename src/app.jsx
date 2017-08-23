import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Modal } from 'react-bootstrap'

// https://www.youtube.com/watch?v=rEuMAqfuCrI

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestData: {
        url: '',
        mode: 'audio'
      },
      objectUrl:null,
      processing: false
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

    this.words = [
      'Au bout de la patience, il y a le ciel.',
      'La patience est l\'art d\'espérer.',
      'La patience peut faire germer des pierres à condition de savoir attendre.',
      'La patience est une fleur qui ne pousse pas dans tous les jardins.',
      'La patience a beaucoup plus de pouvoir que la force.',
      'Si vous avez un peu de patience, vous découvrirez qu\'on peut utiliser les immenses ressources du Web pour perdre son temps avec une efficacité que vous n\'aviez jamais osé imaginer.',
      'Si ce n\'est aujourd\'hui, ce sera demain : rappelons-nous que la patience est le pilier de la sagesse.'
    ]

    this.setState({processing: true})

    fetch('http://localhost/youtube-downloader/script.php', myInit)
    .then((response) => {
      this.setState({url: ''})
      if (response.ok) {
        console.log('success')
        return response.blob()
      } else {
        console.log('error')
      }
      this.setState({processing: false})      
    })
    .then((blob) => {
      console.log('end')
      this.setState({objectUrl: URL.createObjectURL(blob)})
    })
  }

  onDownload(){
    URL.revokeObjectURL(this.state.objectUrl)
    this.setState({requestData: null, objectUrl: null, processing:false})
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
        
        <button disabled={!this.state.requestData || this.state.requestData.url === ''} onClick={() => this.getFile()} className="btn btn-default">Envoyer</button>
        
        {this.state.objectUrl !== null && 
          <div>
            <hr/>
            <a href={this.state.objectUrl} download="from_youtube.zip">Télécharger</a>
          </div>
        }  

        <Modal show={this.state.processing}>
          <Modal.Header>
            <Modal.Title>Veuillez patienter... ça peut prendre du temps!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row"> 
              <div className="col-md-12" style={{textAlign:'center'}}>
                <div className="fa fa-refresh fa-spin fa-3x fa-fw"></div>
                <span className="sr-only">Loading...</span>   
              </div>                
            </div>                   
          </Modal.Body>
        </Modal>     
      </div>
      
    )
  }
}

App.propTypes = {}



export default App
