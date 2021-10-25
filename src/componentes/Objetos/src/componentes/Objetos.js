
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
        /* Configura la instancia */
        xhr.open('get',this.url)
        /* Registramos el evento de fin de la comunicación */
        xhr.addEventListener('load', () => {
          /* Comunicación exitosa */
          if(xhr.status == 200) {
            let respuesta = JSON.parse(xhr.response)
            console.log('XHR Cb', respuesta)
            this.objetos = respuesta
            this.peticion = false
          }
          /* Comunicación error */
          else {
            console.error(`ERROR XHR Cb (status): ${xhr.status}`)
          }
        })
        /* Registramos el evento de error de comunicación */
        xhr.addEventListener('error', e => {
            console.error('ERROR XHR Cb (event):', e)
        })
        xhr.send()
      },

      postPromise() {
        return new Promise((resolve,reject) => {
          /* Creo una instancia de comunicación asincrónica */
          let xhr = new XMLHttpRequest()
          /* Configura la instancia */
          xhr.open('get',this.url)
          /* Registramos el evento de fin de la comunicación */
          xhr.addEventListener('load', () => {
            /* Comunicación exitosa */
            if(xhr.status == 200) {
              let respuesta = JSON.parse(xhr.response)
              resolve(respuesta)
            }
            /* Comunicación error */
            else {
              let error = {
                title: 'Error de status',
                status: xhr.status
              }
              reject(error)              
            }
          })
          /* Registramos el evento de error de comunicación */
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

      /* ---------- AJAX: fetch ----------- */
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


