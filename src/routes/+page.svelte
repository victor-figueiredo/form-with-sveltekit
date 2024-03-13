<script lang="ts">
  import { onMount } from "svelte";

  let name: string = "";
  let phone: string = "";
  let email: string = "";
  let challengeStarted: boolean = false;
  let showModal: boolean = false;
  let timeLeft: number = 15;
  let intervalId: number;
  let showForm: boolean = true; // New variable
  let userData: { name: string; phone: string; email: string } = null; // New variable
  let showUserData: boolean = false; // New variable
  let challengeSuccess: boolean = false;

  const handleSubmit = (): void => {
    challengeStarted = true;
    userData = { name, phone, email }; // Store user data
    showForm = false; // Hide form
    intervalId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        showModal = true;
      }
    }, 1000);
  };

  const finishChallenge = (): void => {
    clearInterval(intervalId);
    showModal = true;
    challengeSuccess = timeLeft > 0;
  };

  const toggleUserData = (): void => {
    showUserData = !showUserData;
    if (!showUserData) {
      showForm = false;
      challengeStarted = true;
    }
  };

  const resetPage = (): void => {
    name = "";
    phone = "";
    email = "";
    challengeStarted = false;
    showModal = false;
    timeLeft = 15;
    showForm = true;
    userData = null;
    showUserData = false;
    challengeSuccess = false;
  };

  let title = "Desafio Técnico";

  onMount(() => {
    document.title = title;
    return () => {
      clearInterval(intervalId);
    };
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="user-data">
  {#if challengeStarted}
    {#if !showUserData}
      <button on:click={toggleUserData} id="showData"> Ver meus dados </button>
    {/if}

    {#if showUserData}
      <button on:click={toggleUserData} id="hideData">
        Ocultar meus dados
      </button>
    {/if}
  {/if}

  {#if showUserData}
    <div id="user-data">
      <p>Nome: {userData.name}</p>
      <p>Telefone: {userData.phone}</p>
      <p>Email: {userData.email}</p>
    </div>
  {/if}
</div>

<div class="container">
  {#if showForm}
    <form on:submit|preventDefault={handleSubmit}>
      <label for="name">Nome:</label>
      <input name="name" id="name" bind:value={name} type="text" required />

      <label for="phone">Telefone:</label>
      <input name="phone" id="phone" bind:value={phone} type="tel" required />

      <label for="email">Email:</label>
      <input name="email" id="email" bind:value={email} type="email" required />

      <button id="startChallenge" type="submit">Iniciar Desafio</button>
    </form>
  {/if}

  {#if challengeStarted}
    <button id="finishChallenge" on:click={finishChallenge}
      >Finalizar Desafio</button
    >
  {/if}

  <p class="timer">
    Tempo restante: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10
      ? "0"
      : ""}{timeLeft % 60}
  </p>

  {#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      class="modal fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      on:click={resetPage}
    >
      <div
        class="modal-content flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        on:click|stopPropagation
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen text-black"
          aria-hidden="true">&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {challengeSuccess
                    ? "Desafio finalizado com sucesso"
                    : "Desafio finalizado com falha"}
                </h3>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              on:click={resetPage}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .user-data {
    position: fixed;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  #user-data {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .timer {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
  }

  label {
    margin: 10px 0;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px;
    margin-top: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
  }
</style>
