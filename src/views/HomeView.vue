<template>
  <div class="container p-4">
    <h2>Halaman Dashboard</h2>
  </div>
  <div class="container">
    <!-- Alert -->
    <div  v-if="this.$attrs.message_success_post" class="alert alert-success alert-dismissible fade show" role="alert">
      <span>{{ this.$attrs.message_success_post }}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <!-- Alert -->

    <!-- Consultation -->
    <h5>My Consultation</h5>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">Consultation</div>
          <div class="card-body">
            <div v-if="consultation.length == 0">
              <RouterLink to="/request_consultation" class="text-decoration-none">
                +<span class="text-decoration-underline">Request Consultation</span>
              </RouterLink>
            </div>
          
            <!-- Table -->
            <div v-else class="table-responsive">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td class="p-2">Statu</td>
                    <td>
                      <span class="badge bg-info text-capitalize" >
                        {{ consultation.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Table End -->

          </div>
        </div>
      </div>
    </div> 
    <!-- Consultation End -->
  </div>
</template>

<!-- <style scoped>
  .decoration {
    text-decoration: none;
  }
</style> -->

<script>
export default {
  data() {
    return {
      consultation: [],
      vaccination: {
        first: {},
        second: {},
      },
    };
  },
};
</script>
