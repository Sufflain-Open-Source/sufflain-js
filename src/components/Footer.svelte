<script>
    export let appVersion = '';
</script>

<footer>
    <p>Sufflain { appVersion }</p>
    <p>Copyright (c) 2022 Timofey Chuchkanov</p>
</footer>

<style>
    footer {
        display: grid;
        place-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-bottom: calc(var(--nav-bar-height) * 2);
    }
</style>