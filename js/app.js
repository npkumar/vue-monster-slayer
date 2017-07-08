new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        hasGameStarted: false,
        maxPlayerDamage: 10,
        minPlayerDamage: 5,
        maxMonsterDamage: 15,
        minMonsterDamage: 4,
        healAmount: 10,
        maxHealth: 100,
        logs : []
    },
    methods: {
        startGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.hasGameStarted = true;
            this.logs = [];
        },
        attack: function() {
            // do not deal damage if game is over
            if (this.checkGameStatus()) {
                return;
            }
            const damage = this.calculateDamage(this.minPlayerDamage, this.maxPlayerDamage);
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                message: `Player kicks monster! Deals ${damage} damage!`
            });
            this.monsterAttack();
            this.checkGameStatus();
        },
        specialAttack: function () {
            if (this.checkGameStatus()) {
                return;
            }
            const damage = this.calculateDamage(this.minPlayerDamage + 20, this.maxPlayerDamage + 20);
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                message: `Player uses kamehameha ======>) Deals ${damage} damage!`
            });
            this.monsterAttack();
            this.checkGameStatus();
        },
        heal: function() {
            if (this.playerHealth + this.healAmount <= this.maxHealth) {
                this.playerHealth += this.healAmount;
                this.logs.unshift({
                    isPlayer: true,
                    message: `Player drinks kickapoo juice. Heals ${this.healAmount}`
                });
            }
            this.monsterAttack();
        },
        giveUp: function() {
            this.hasGameStarted = false;
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttack: function() {
            const damage = this.calculateDamage(this.minMonsterDamage, this.maxMonsterDamage);
            this.playerHealth -= damage;
            this.logs.unshift({
                isPlayer: false,
                message: `Monster licks player! Deals ${damage} damage!`
            });
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