<div class="loading-container">
    <div class="loading-indicator"></div>
</div>

<style>
    div.loading-container {
        display: grid;
        place-items: center;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    div.loading-indicator {
        height: 40px;
        width: 40px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-image: url(/img/loading.svg);
        animation: spin 0.5s ease-in-out infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

</style>
