namespace SpriteKind {
    export const Infectado = SpriteKind.create()
    export const Alma = SpriteKind.create()
}

let damian: Sprite = null
let alma: Sprite = null
let nivel = 1
let eliminados = 0
let objetivo = 5
let puedeJugar = false

function crearInfectado(rapidez: number) {
    let infectado = sprites.create(img`
        . 2 2 2 2 .
        2 7 7 7 7 2
        2 7 1 7 1 2
        2 7 7 7 7 2
        . 2 7 7 2 .
        . 2 . . 2 .
    `, SpriteKind.Infectado)
    infectado.setPosition(randint(10, 150), randint(10, 110))
    infectado.follow(damian, rapidez)
}

function comenzarNivel() {
    for (let enemigo of sprites.allOfKind(SpriteKind.Infectado)) {
        enemigo.destroy()
    }
    if (nivel == 1) {
        scene.setBackgroundColor(7)
        objetivo = 5
        game.showLongText("NIVEL 1: Ciudad infectada", DialogLayout.Bottom)
        for (let i = 0; i < 5; i++) crearInfectado(18)
    } else if (nivel == 2) {
        scene.setBackgroundColor(13)
        objetivo = 11
        game.showLongText("NIVEL 2: El grupo 2:12 encontró el refugio", DialogLayout.Bottom)
        for (let i = 0; i < 6; i++) crearInfectado(28)
    } else {
        scene.setBackgroundColor(15)
        objetivo = 18
        game.showLongText("NIVEL 3: Resiste hasta que llegue la ayuda", DialogLayout.Bottom)
        for (let i = 0; i < 7; i++) crearInfectado(40)
    }
}

function pasarDeNivel() {
    nivel += 1
    if (nivel > 3) {
        game.over(true, effects.confetti)
    } else {
        comenzarNivel()
    }
}

damian = sprites.create(img`
    . 8 8 .
    8 9 9 8
    8 1 1 8
    . 1 1 .
`, SpriteKind.Player)
alma = sprites.create(img`
    5 5
    5 4
    5 5
`, SpriteKind.Alma)
damian.setPosition(80, 60)
alma.setPosition(105, 60)
alma.follow(damian, 45)
controller.moveSprite(damian, 85, 85)
damian.setStayInScreen(true)
alma.setStayInScreen(true)
info.setLife(5)
info.setScore(0)
game.splash("LA ÚLTIMA DEFENSA DE ALMA", "A: dispara | Flechas: mover")
game.showLongText("Damián protege a Alma. Su sangre contiene la cura del virus y 2:12 quiere secuestrarla.", DialogLayout.Full)
puedeJugar = true
comenzarNivel()

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (puedeJugar) {
        let disparo = sprites.createProjectileFromSprite(img`
            5
        `, damian, 110, 0)
        disparo.lifespan = 900
        music.playTone(523, music.beat(BeatFraction.Sixteenth))
    }
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Infectado, function (disparo, infectado) {
    disparo.destroy(effects.disintegrate, 100)
    infectado.destroy(effects.disintegrate, 100)
    eliminados += 1
    info.changeScoreBy(1)
    music.playTone(784, music.beat(BeatFraction.Sixteenth))
    if (eliminados >= objetivo) pasarDeNivel()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Infectado, function (jugador, infectado) {
    infectado.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 200)
})

sprites.onOverlap(SpriteKind.Alma, SpriteKind.Infectado, function (hija, infectado) {
    infectado.destroy()
    info.changeLifeBy(-2)
    game.showLongText("¡Alma está en peligro!", DialogLayout.Bottom)
})

info.onLifeZero(function () {
    puedeJugar = false
    game.over(false, effects.melt)
})