<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <NavbarToOffcanvasAdmin v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvasAdmin>
    
    <div class="container-full">
      <h3 style="text-align: left;"> User's Bets </h3>
      <hr/>


      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 col-lg-5" style="min-width: 100%;">

            <table style="overflow-x:auto; background-color:white;">
              <tr>
                <th>Event</th>
                <th>Sport</th>
                <th>League</th>
                <th>Bet Amount</th>
                <th>Expected Result</th>
                <th>Paid</th>
                <th>User</th>
              </tr>
              <tr>
                <td>FCPorto - SLBenfica</td>
                <td>Soccer</td>
                <td>Primeira Liga</td>
                <td>10 ESScoins</td>
                <td>Win Home</td>
                <td class="text-warning">No</td>
                <td>joao_oli_25</td>
              </tr>
              <tr>
                <td>FCPorto - SLBenfica</td>
                <td>Soccer</td>
                <td>Primeira Liga</td>
                <td>10 ESScoins</td>
                <td>Win Home</td>
                <td class="text-warning">No</td>
                <td>joao_oli_25</td>
              </tr>
            </table>

          </div>
        </div>
      </div>

    </div>
  
  </div>
</template>

<script>
import NavbarToOffcanvasAdmin from '../components/NavBarToOffcanvasAdmin'
export default {
  name: 'bets',
  components: {
    NavbarToOffcanvasAdmin
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }


.container-full { 
  background-color: black;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
  padding-top: 8%;
  padding-left: 10%;
  padding-right: 10%;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid darkgray;
}

table {
  width: 100%;
}

th {
  height: 50px;
  border-bottom: 3px solid orange;
  color: black;
}

td {
  color: rgb(107, 106, 106);
}
</style>
