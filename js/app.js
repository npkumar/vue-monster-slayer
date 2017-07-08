new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        hasGameStarted: false,
        maxPlayerDamage: 10,
        minPlayerDamage: 5,
        maxMonsterDamage: 15,
        minMonsterDamage: 4
    },
    methods: {
        startGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.hasGameStarted = true;
        },
        attack: function() {
            // do not deal damage if game is over
            if (this.checkGameStatus()) {
                return;
            }
            this.monsterHealth -= this.calculateDamage(this.minPlayerDamage, this.maxPlayerDamage);
            this.monsterAttack();
            this.checkGameStatus();
        },
        specialAttack: function () {
            if (this.checkGameStatus()) {
                return;
            }
            this.monsterHealth -= this.calculateDamage(this.minPlayerDamage + 20, this.maxPlayerDamage + 20);
            this.monsterAttack();
            this.checkGameStatus();
        },
        heal: function() {

        },
        giveUp: function() {

        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttack: function() {
            this.playerHealth -= this.calculateDamage(this.minMonsterDamage, this.maxMonsterDamage);
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