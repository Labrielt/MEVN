<template>
  <v-form v-model="valido" ref="formulario" lazy-validation>
    <v-text-field
      label="Nombre"
      v-model="nombre"
      required></v-text-field>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="reglasEmail"
      required></v-text-field>
    <v-text-field
      label="Contraseña"
      v-model="contrasenha"
      required
      type="password"></v-text-field>

      <v-text-field
      label="Confirmar Contraseña"
      v-model="confirmar_contrasenha"
      required
      type="password"></v-text-field>

      <v-btn
        @click="enviar"
        :disabled="!valido"
      >Enviar</v-btn>
      <v-btn
        @click="limpiar"
      >limpiar</v-btn>

  </v-form>

</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    email: '',
    contrasenha: '',
    confirmar_contrasenha: '',
    reglasEmail: [
      v => !!v || 'Email Requerido',
      v => /\S+@\S+\./.test(v) || 'El email deber valido',
    ],
  }),

  methods: {
    async enviar() {
      if (this.$refs.formulario.validate()) {
        // agregar proceso aqui
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            email: this.email,
            contrasenha: this.contrasenha,
          },
          url: 'http://localhost:8081/usuarios/registro',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Maravilloso !',
              'Usted por fin se ha podido registrarse',
              'success',
            );
            this.$router.push({ name: 'Login' });
            this.$refs.formulario.reset();
          })
          .catch((error) => {
            const mensaje = error.response.data.mensaje;
          });
      }

      return true;
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>

