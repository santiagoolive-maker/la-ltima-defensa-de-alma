namespace SpriteKind {
    export const Infectado = SpriteKind.create()
    export const Alma = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Alma, SpriteKind.Infectado, function (hija, infectado) {
    infectado.destroy()
    info.changeLifeBy(-2)
    game.showLongText("¡Alma está en peligro!", DialogLayout.Bottom)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Infectado, function (disparo, infectado) {
    disparo.destroy(effects.disintegrate, 100)
    infectado.destroy(effects.disintegrate, 100)
    eliminados += 1
    info.changeScoreBy(1)
    music.playTone(784, music.beat(BeatFraction.Sixteenth))
    if (eliminados >= objetivo) {
        pasarDeNivel()
    }
})
function crearInfectado (rapidez: number) {
    infectado = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f d b b d f f . . . . 
        . . . f b b d d d d b b f . . . 
        . . . f b d d d d d d b f . . . 
        . . f d d d d d d d d d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d b 1 d d 1 b d d f . . 
        . . f b d b f d d f b d b f . . 
        . . f c d c f 1 1 f c d c f . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . f f f c 2 b 1 b d f f f f . 
        f c 1 1 1 c b 2 b 2 c 1 1 1 c f 
        f 1 b 1 b 1 2 2 2 2 1 b 1 b 1 f 
        f b f b f 2 2 2 2 2 b f b f b f 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        `, SpriteKind.Infectado)
    infectado.setPosition(randint(10, 150), randint(10, 110))
    infectado.follow(damian, rapidez)
}
function comenzarNivel () {
    for (let enemigo of sprites.allOfKind(SpriteKind.Infectado)) {
        enemigo.destroy()
    }
    if (nivel == 1) {
        scene.cameraFollowSprite(damian)
        tiles.setCurrentTilemap(tilemap`nivel1`)
        objetivo = 5
        game.showLongText("NIVEL 1: Ciudad infectada", DialogLayout.Bottom)
        for (let index = 0; index < 5; index++) {
            crearInfectado(18)
        }
    } else if (nivel == 2) {
        tiles.setCurrentTilemap(tilemap`nivel2`)
        objetivo = 11
        game.showLongText("NIVEL 2: El grupo 2:12 encontró el refugio", DialogLayout.Bottom)
        for (let index = 0; index < 6; index++) {
            crearInfectado(28)
        }
    } else {
        tiles.setCurrentTilemap(tilemap`nivel3`)
        objetivo = 18
        game.showLongText("NIVEL 3: Resiste hasta que llegue la ayuda", DialogLayout.Bottom)
        for (let index = 0; index < 7; index++) {
            crearInfectado(40)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (puedeJugar) {
        angulo = randint(0, 359)
        vx = Math.cos(angulo * Math.PI / 180) * 110
        vy = Math.sin(angulo * Math.PI / 180) * 110
        disparo = sprites.createProjectileFromSprite(img`
            f f f f . 
            f 5 5 5 f 
            f f f f . 
            `, damian, vx, vy)
        disparo.lifespan = 900
        music.playTone(523, music.beat(BeatFraction.Sixteenth))
    }
})
function pasarDeNivel () {
    nivel += 1
    if (nivel > 3) {
        game.over(true, effects.confetti)
    } else {
        comenzarNivel()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Infectado, function (jugador, infectado) {
    infectado.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 200)
    eliminados += 1
    if (eliminados >= objetivo) {
        pasarDeNivel()
    }
})
info.onLifeZero(function () {
    puedeJugar = false
    game.over(false, effects.melt)
})
let disparo: Sprite = null
let vy = 0
let vx = 0
let angulo = 0
let infectado: Sprite = null
let eliminados = 0
let puedeJugar = false
let damian: Sprite = null
let objetivo = 0
let nivel = 0
nivel = 1
objetivo = 5
damian = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f 5 5 5 5 5 5 f f f . . 
    . . f f 7 7 7 7 7 7 7 7 5 f . . 
    . . f 7 7 f f f f f f 7 7 f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
let alma = sprites.create(img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c 4 4 c c c c f . 
    . f f c c 4 4 4 4 c c f f . 
    . f f f b f 4 4 f b f f f . 
    . f f 4 1 f d d f 1 4 f f . 
    . . f f d d d d d d f f . . 
    . . e f e 4 4 4 4 e f e . . 
    . e 4 f b 3 3 3 3 b f 4 e . 
    . 4 d f 3 3 3 3 3 3 c d 4 . 
    . 4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
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
