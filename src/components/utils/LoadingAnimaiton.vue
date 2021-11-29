<template>
  <svg viewBox="0 0 94 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke-width="10" stroke-linecap="round"
          d="M15.8995 69.4225 C9.24391 73.692 0.5 68.9128 0.5 61.0055 V10.9945 C0.5 3.08715 9.24391 -1.69205 15.8995 2.57751
           L78.1005 69.4225 C84.7561 73.692 93.5 68.9128 93.5 61.0055 V10.9945 C93.5 3.08716 84.7561 -1.69205 78.1005 2.57751
           L15.8995 69.4225 Z"
    ></path>
  </svg>
</template>


<script>
export default {
  name: 'LoadingAnimaiton',
};
</script>


<style scoped>

svg {
  overflow: visible;
  width: 80px;
}

path {
  --line-length: 80;
  --total_path_length: 369;
  --blue: #0070C0; /* #0070C0 */
  --red: #FF0000; /* #FF0000 */

  stroke-dasharray: var(--line-length) calc(var(--total_path_length) - var(--line-length));
  stroke-dashoffset: 0;

  animation-name: anim;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-timing-function: linear;
}

@keyframes anim {
  0% {
    stroke: var(--red);
    stroke-dashoffset: 0;
  }
  30% {
    stroke: var(--blue);
  }
  50% {
    stroke: var(--blue);
  }
  80% {
    stroke: var(--red);
  }
  100% {
    stroke: var(--red);
    stroke-dashoffset: var(--total_path_length);
  }
}

</style>
