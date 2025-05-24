class ZenoFMPlayer {
    constructor() {
        this.audioElement = new Audio('https://stream.zeno.fm/wttrxavefwzuv');  // Replace with actual stream URL
        this.playPauseBtn = document.getElementById('play-pause');
        this.volumeSlider = document.getElementById('volume-slider');
        this.listenersMap = document.getElementById('listeners-map');
        this.currentListenersEl = document.getElementById('current-listeners');
        
        this.initializeEventListeners();
        this.initializeListenerMap();
        this.startListenerSimulation();
    }

    initializeEventListeners() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    }

    initializeListenerMap() {
        this.map = L.map(this.listenersMap).setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ' OpenStreetMap contributors'
        }).addTo(this.map);

        this.listenerMarkers = [];
    }

    startListenerSimulation() {
        // Simulated listener locations
        const simulatedLocations = [
            { lat: 19.4326, lng: -99.1332, city: 'Ciudad de México' },
            { lat: -34.6037, lng: -58.3816, city: 'Buenos Aires' },
            { lat: 4.7110, lng: -74.0721, city: 'Bogotá' },
            { lat: -12.0464, lng: -77.0428, city: 'Lima' },
            { lat: 40.4168, lng: -3.7038, city: 'Madrid' }
        ];

        this.updateListeners(simulatedLocations);
    }

    updateListeners(locations) {
        // Clear existing markers
        this.listenerMarkers.forEach(marker => this.map.removeLayer(marker));
        this.listenerMarkers = [];

        // Add new markers
        locations.forEach(location => {
            const marker = L.marker([location.lat, location.lng])
                .bindPopup(location.city)
                .addTo(this.map);
            this.listenerMarkers.push(marker);
        });

        // Update listener count
        this.currentListenersEl.textContent = locations.length;
    }

    togglePlayPause() {
        if (this.audioElement.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    play() {
        this.audioElement.play();
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    pause() {
        this.audioElement.pause();
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    setVolume(volume) {
        this.audioElement.volume = volume;
    }
}

// Initialize the player when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ZenoFMPlayer();
});