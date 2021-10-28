
export default {
  name: 'src-componentes-objetos',
  components: {},
  props: [],
  data () {
    return {
      url: "https://6175e83903178d00173daa13.mockapi.io/usuarios",
      objetos: [],
      peticion: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
      getPostCb() {
        this.objetos = []
        this.peticion = true
        let xhr = new XMLHttpRequest()
        xhr.open('get',this.url)
        xhr.addEventListener('load', () => {
          if(xhr.status == 200) {
            let respuesta = JSON.parse(xhr.response)
            console.log('XHR Cb', respuesta)
            this.objetos = respuesta
            this.peticion = false
          }
          else {
            console.error(`ERROR XHR Cb (status): ${xhr.status}`)
          }
        })
        xhr.addEventListener('error', e => {
            console.error('ERROR XHR Cb (event):', e)
        })
        xhr.send()
      },

      postPromise() {
        return new Promise((resolve,reject) => {
          let xhr = new XMLHttpRequest()
          xhr.open('get',this.url)
          xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
              let respuesta = JSON.parse(xhr.response)
              resolve(respuesta)
            }
            else {
              let error = {
                title: 'Error de status',
                status: xhr.status
              }
              reject(error)              
            }
          })
          xhr.addEventListener('error', e => {
              let error = {
                title: 'Error event XHR',
                info: e
              }
              reject(error)  
          })
          xhr.send()
        })
      },
      
      async getPostPromise() {
        this.objetos = []
        this.peticion = true
        try {
          let respuesta = await this.postPromise()
          console.log('XHR Promise', respuesta)
          this.objetos = respuesta
          this.peticion = false
        }
        catch(error) {
          console.error('Error XHR Promise', error)
        }
      },

      async getPostFetch() {
        this.objetos = []
        this.peticion = true
        try {
          let response = await fetch(this.url)
          let respuesta = await response.json()
          console.log('FETCH', respuesta)
          this.objetos = respuesta
          this.peticion = false
        }
        catch(error) {
          console.error('Error FETCH', error)
        }
      },

      async getPostAxios() {
        this.objetos = []
        this.peticion = true
        try {
          let respuesta = await this.axios(this.url)
          console.log('AXIOS', respuesta.data)
          this.objetos = respuesta.data
          this.peticion = false
        }
        catch(error) {
          console.error('Error AXIOS', error)
        }
      }
  }
}


