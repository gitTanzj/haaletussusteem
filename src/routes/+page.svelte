<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import "../app.css";
  import { onMount } from "svelte";
  // import { choiceQuery } from '$lib/database'

  interface Notification {
    message: string;
    type: "success" | "error" | "none";
  }

  let notification: Notification = {
    message: "None",
    type: "none",
  };
  $: notification_class =
    notification && notification.type == "success"
      ? "bg-green-600"
      : notification.type == "error"
        ? "bg-red-600"
        : "";

  let firstname: string = "";
  let lastname: string = "";
  let choice: string = "vastu";

  const handleSubmit = async (e: Event) => {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("choice", choice);

    const response = await fetch("/api/vote", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      notification = {
        message: "Hääl saadetud",
        type: "success",
      };
    } else {
      notification = {
        message: "Häält ei suudetud saata",
        type: "error",
      };
    }

    firstname = "";
    lastname = "";
    invalidateAll();

    setTimeout(() => {
      notification = {
        message: "None",
        type: "none",
      };
    }, 5000);
  };

  export let data;
  console.log(data.stats);
</script>

<div
  class="flex justify-center items-center min-h-screen bg-zinc-900 text-zinc-200"
>
  <div class="flex p-8">
    <div class="flex flex-col p-5">
      <h2 class="text-4xl mt-8 mb-4 text-zinc-50 font-extralight">Poolt</h2>
      {#each data.stats.peopleFor as person}
        <div class="flex justify-between">
          <p>{person.eesnimi} {person.perenimi}</p>
        </div>
      {/each}
    </div>
    <div class="flex flex-col p-5">
      <h2 class="text-4xl mt-8 mb-4 text-zinc-50 font-extralight">Vastu</h2>
      {#each data.stats.peopleAgainst as person}
        <div class="flex justify-between">
          <p>{person.eesnimi} {person.perenimi}</p>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex flex-col p-8 items-center rounded">
    <h1 class="text-6xl mb-8 text-zinc-50 font-extralight">Hääletage!</h1>

    {#if notification.type != "none"}
      <div
        class="flex flex-col mb-4 w-full px-4 py-2 text-white rounded {notification_class}"
      >
        <p class="text-black/45 font-bold text-sm">{notification.type}</p>
        <p class="px-2">{notification.message}</p>
      </div>
    {/if}

    <form class="flex flex-col gap-4" on:submit={handleSubmit}>
      <!-- Eesnimi ja Perekonnanimi -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-sm font-bold" for="firstname">Eesnimi</label>
          <input
            bind:value={firstname}
            class="bg-zinc-700 rounded rounded px-2 py-1 border border-zinc-500 placeholder:text-zinc-500"
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Mart"
            required
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-bold" for="lastname">Perekonnanimi</label>
          <input
            bind:value={lastname}
            class="bg-zinc-700 rounded px-2 py-1 border border-zinc-500 placeholder:text-zinc-500"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Mets"
            required
          />
        </div>
      </div>

      <!-- Otsus -->
      <div class="flex justify-center items-center gap-2">
        <label class="text-sm font-bold" for="choice">Otsus</label>
        <select
          class="bg-zinc-700 px-2 py-1 rounded appearance-none border border-zinc-500"
          name="choice"
          bind:value={choice}
        >
          <option value="vastu">❌</option>
          <option value="poolt">✅</option>
        </select>
      </div>

      <div class="flex justify-center">
        <input
          class="px-4 py-1 rounded text-white bg-orange-600 hover:bg-orange-500 focus:bg-orange-600 font-bold uppercase"
          type="submit"
          value="Hääletan"
        />
      </div>
    </form>
    <!-- TULEMUSED -->
    <div>
      <h2 class="text-4xl mt-8 mb-4 text-zinc-50 font-extralight">Tulemused</h2>
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <p>Poolt</p>
          <p>{data.stats.for}</p>
        </div>
        <div class="flex justify-between">
          <p>Vastu</p>
          <p>{data.stats.against}</p>
        </div>
      </div>
    </div>
  </div>
</div>
