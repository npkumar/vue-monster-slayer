new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        hasGameStarted: false
    },
    methods: {
        startGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.hasGameStarted = true;
        },
        attack: function() {
            const maxPlayerDamage = 10;
            const minPlayerDamage = 5;
            const maxMonsterDamage = 15;
            const minMonsterDamage = 4;

            // do not deal damage if game is over
            if (this.checkGameStatus()) {
                return;
            }
            this.monsterHealth -= this.calculateDamage(minPlayerDamage, maxPlayerDamage);
            this.playerHealth -= this.calculateDamage(minMonsterDamage, maxMonsterDamage);
            this.checkGameStatus();
        },
        specialAttack: function () {

        },
        heal: function() {

        },
        giveUp: function() {

        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkGameStatus: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! Play again?')) {
                    this.startGame();
                } else {
                    hasGameStarted = false;

                    // you cannot be more dead than dead :)
                    this.monsterHealth = 0;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! Play again?')) {
                    this.startGame();
                } else {
                    hasGameStarted = false;
                    this.playerHealth = 0;
                }
                return true;               
            }
            return false;
        }
    }
});