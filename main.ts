main.ts:328: trailing whitespace.
+    let velocidadX = dx2 / distancia2 * rapidez
main.ts:329: trailing whitespace.
+    let velocidadY = dy2 / distancia2 * rapidez
main.ts:330: trailing whitespace.
+    veneno2 = sprites.createProjectileFromSprite(img`
main.ts:335: trailing whitespace.
+        `, jefe, velocidadX - velocidadY * 0.35, velocidadY + velocidadX * 0.35)
main.ts:338: trailing whitespace.
+    let veneno3 = sprites.createProjectileFromSprite(img`
main.ts:339: trailing whitespace.
+        . 7 7 . 
main.ts:340: trailing whitespace.
+        7 5 5 7 
main.ts:341: trailing whitespace.
+        7 5 5 7 
main.ts:342: trailing whitespace.
+        . 7 7 . 
main.ts:343: trailing whitespace.
+        `, jefe, velocidadX + velocidadY * 0.35, velocidadY - velocidadX * 0.35)
main.ts:344: trailing whitespace.
+    veneno3.setKind(SpriteKind.Veneno)
main.ts:345: trailing whitespace.
+    veneno3.lifespan = 3000
diff --git a/main.ts b/main.ts
index 9d4d263..219c9bd 100644
--- a/main.ts
+++ b/main.ts
@@ -63,13 +63,6 @@ controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
         angulo = randint(0, 359)
         vx = Math.cos(angulo * Math.PI / 180) * 110
         vy = Math.sin(angulo * Math.PI / 180) * 110
-        if (nivel == 4 && jefe != null && vidaJefe > 0) {
-            dx = jefe.x - damian.x
-            dy = jefe.y - damian.y
-            distancia = Math.max(1, Math.sqrt(dx * dx + dy * dy))
-            vx = dx / distancia * 140
-            vy = dy / distancia * 140
-        }
         disparo = sprites.createProjectileFromSprite(img`
             f f f f . 
             f 5 5 5 f 
@@ -256,9 +249,6 @@ let dx2 = 0
 let proximoDano = 0
 let barraJefe: Sprite = null
 let disparo: Sprite = null
-let distancia = 0
-let dy = 0
-let dx = 0
 let jefe: Sprite = null
 let vy = 0
 let vx = 0
@@ -335,14 +325,24 @@ game.onUpdateInterval(1400, function () {
     dy2 = damian.y - jefe.y
     distancia2 = Math.max(1, Math.sqrt(dx2 * dx2 + dy2 * dy2))
     let rapidez = vidaJefe <= 10 ? 75 : 50
-veneno2 = sprites.createProjectileFromSprite(img`
+    let velocidadX = dx2 / distancia2 * rapidez
+    let velocidadY = dy2 / distancia2 * rapidez
+    veneno2 = sprites.createProjectileFromSprite(img`
         . 7 7 . 
         7 5 5 7 
         7 5 5 7 
         . 7 7 . 
-        `, jefe, dx2 / distancia2 * rapidez, dy2 / distancia2 * rapidez)
+        `, jefe, velocidadX - velocidadY * 0.35, velocidadY + velocidadX * 0.35)
     veneno2.setKind(SpriteKind.Veneno)
     veneno2.lifespan = 3000
+    let veneno3 = sprites.createProjectileFromSprite(img`
+        . 7 7 . 
+        7 5 5 7 
+        7 5 5 7 
+        . 7 7 . 
+        `, jefe, velocidadX + velocidadY * 0.35, velocidadY - velocidadX * 0.35)
+    veneno3.setKind(SpriteKind.Veneno)
+    veneno3.lifespan = 3000
 })
 
 // Música de suspenso: cambia durante la pelea contra el jefe.
namespace SpriteKind {
    export const Infectado = SpriteKind.create()
    export const Alma = SpriteKind.create()
    export const Jefe = SpriteKind.create()
    export const Veneno = SpriteKind.create()
    export const BarraJefe = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Alma, SpriteKind.Infectado, function (hija, infectado) {
    if (!(puedeJugar)) {
        return
    }
    infectado.destroy()
    eliminados += 1
    info.changeLifeBy(-2)
    if (puedeJugar) {
        game.showLongText("¡Alma está en peligro!", DialogLayout.Bottom)
        if (eliminados >= objetivo) {
            pasarDeNivel()
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Infectado, function (disparo, infectado) {
    if (!(puedeJugar)) {
        return
    }
    disparo.destroy(effects.disintegrate, 100)
    infectado.destroy(effects.disintegrate, 100)
    eliminados += 1
    info.changeScoreBy(1)
    music.playTone(784, music.beat(BeatFraction.Sixteenth))
    if (eliminados >= objetivo) {
        pasarDeNivel()
    }
})
sprites.onOverlap(SpriteKind.Alma, SpriteKind.Veneno, function (hija, veneno) {
    veneno.destroy()
    recibirDanoJefe(1)
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
function actualizarBarraJefe () {
    barraJefe.image.fill(1)
    barraJefe.image.fillRect(1, 1, 32, 3, 15)
    if (vidaJefe > 0) {
        barraJefe.image.fillRect(1, 1, Math.max(1, Math.round(32 * vidaJefe / 20)), 3, 2)
    }
}
sprites.onOverlap(SpriteKind.Alma, SpriteKind.Jefe, function (hija, enemigo) {
    recibirDanoJefe(2)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Jefe, function (bala, enemigo) {
    if (!(puedeJugar) || vidaJefe <= 0) {
        return
    }
    bala.destroy(effects.disintegrate, 50)
    vidaJefe += -1
    info.changeScoreBy(1)
    actualizarBarraJefe()
    if (vidaJefe == 10) {
        jefe.follow(damian, 28)
        jefe.sayText("¡FURIA!", 1000, false)
    }
    if (vidaJefe <= 0) {
        puedeJugar = false
        jefe.destroy(effects.disintegrate, 500)
        barraJefe.destroy()
        for (let veneno of sprites.allOfKind(SpriteKind.Veneno)) {
            veneno.destroy()
        }
        info.changeScoreBy(50)
        game.showLongText("¡Venciste al Paciente Cero! Damián y Alma escaparon. La cura está a salvo.", DialogLayout.Full)
        game.over(true, effects.confetti)
    }
})
function comenzarNivel () {
    puedeJugar = false
    for (let bala of sprites.allOfKind(SpriteKind.Projectile)) {
        bala.destroy()
    }
    for (let enemigo of sprites.allOfKind(SpriteKind.Infectado)) {
        enemigo.destroy()
    }
    if (nivel == 1) {
        scene.cameraFollowSprite(damian)
        damian.setStayInScreen(true)
        alma.setStayInScreen(true)
        tiles.setCurrentTilemap(tilemap`nivel1`)
        objetivo = 5
        game.showLongText("NIVEL 1: Ciudad infectada", DialogLayout.Bottom)
        for (let index = 0; index < 5; index++) {
            crearInfectado(18)
        }
    } else if (nivel == 2) {
        scene.cameraFollowSprite(damian)
        damian.setStayInScreen(true)
        alma.setStayInScreen(true)
        tiles.setCurrentTilemap(tilemap`nivel2`)
        objetivo = 11
        game.showLongText("NIVEL 2: El grupo 2:12 encontró el refugio", DialogLayout.Bottom)
        for (let index = 0; index < 6; index++) {
            crearInfectado(28)
        }
    } else if (nivel == 3) {
        scene.cameraFollowSprite(damian)
        damian.setStayInScreen(true)
        alma.setStayInScreen(true)
        tiles.setCurrentTilemap(tilemap`nivel3`)
        objetivo = 18
        game.showLongText("NIVEL 3: Resiste hasta que llegue la ayuda", DialogLayout.Bottom)
        for (let index = 0; index < 7; index++) {
            crearInfectado(40)
        }
    } else if (nivel == 4) {
        comenzarJefe()
    }
    puedeJugar = true
}
function pasarDeNivel () {
    if (!(puedeJugar)) {
        return
    }
    puedeJugar = false
    nivel += 1
    if (nivel > 4) {
        game.over(true, effects.confetti)
    } else {
        comenzarNivel()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Infectado, function (jugador, infectado) {
    if (!(puedeJugar)) {
        return
    }
    infectado.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 200)
    eliminados += 1
    if (eliminados >= objetivo) {
        pasarDeNivel()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Veneno, function (jugador, veneno) {
    veneno.destroy()
    recibirDanoJefe(1)
})
function recibirDanoJefe (cantidad: number) {
    if (!(puedeJugar) || game.runtime() < proximoDano) {
        return
    }
    proximoDano = game.runtime() + 1200
    info.changeLifeBy(0 - cantidad)
    scene.cameraShake(4, 200)
}
info.onLifeZero(function () {
    puedeJugar = false
    game.over(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Jefe, function (jugador, enemigo) {
    recibirDanoJefe(1)
})
function comenzarJefe () {
    // Corrección: la cámara ahora sigue a Damián.
    scene.cameraFollowSprite(damian)
    // Corrección: Damián y Alma pueden recorrer el mapa completo.
    damian.setStayInScreen(false)
    alma.setStayInScreen(false)
    // Dejá solamente el mapa real del jefe.
    tiles.setCurrentTilemap(tilemap`level2`)
    damian.setPosition(35, 85)
    alma.setPosition(18, 95)
    info.setLife(5)
    vidaJefe = 20
    proximoDano = 0
    game.showLongText("NIVEL 4: EL PACIENTE CERO. Protege a Alma, esquiva el veneno y pulsa A para disparar al jefe. Al perder media vida se vuelve más rápido.", DialogLayout.Full)
    jefe = sprites.create(img`
        ..22................22..
        ..222..............222..
        ...22ffffffffffffff22...
        ...ffaaaaaaaaaaaaaaff...
        ..faaaaaaaaaaaaaaaaaaf..
        ..faaaaaaaaaaaaaaaaaaf..
        ..faafffaaaaaaaafffaaf..
        ..faaf22faaaaaaf22faaf..
        ..faaf22faaaaaaf22faaf..
        ..faaaffaaaaaaaaffaaaf..
        ..faaaaaaaffffaaaaaaaf..
        ...faaaaf111111faaaaf...
        ...faaaaf1f1f1ffaaaaf...
        ....faaaaffffffaaaaf....
        ..ffffaaaaaaaaaaaaffff..
        .faaaaffaaaaaaaaffaaaaf.
        faaaaaaffffffffffaaaaaaf
        faaaaaaf22222222faaaaaaf
        .ffffff2222222222ffffff.
        ......f2222222222f......
        ......f2222ff2222f......
        ......faaaf..faaaf......
        .....faaaaf..faaaaf.....
        .....ffffff..ffffff.....
        `, SpriteKind.Jefe)
    jefe.setPosition(120, 30)
    jefe.setFlag(SpriteFlag.GhostThroughWalls, true)
    // El jefe también puede moverse por el mapa.
    jefe.setStayInScreen(false)
    jefe.follow(damian, 15)
    barraJefe = sprites.create(image.create(34, 5), SpriteKind.BarraJefe)
    barraJefe.setFlag(SpriteFlag.Ghost, true)
    barraJefe.z = 10
    actualizarBarraJefe()
}
let veneno2: Sprite = null
let distancia2 = 0
let dy2 = 0
let dx2 = 0
let proximoDano = 0
let barraJefe: Sprite = null
let disparo: Sprite = null
let jefe: Sprite = null
let vy = 0
let vx = 0
let angulo = 0
let infectado: Sprite = null
let eliminados = 0
let puedeJugar = false
let alma: Sprite = null
let damian: Sprite = null
let objetivo = 0
let nivel = 0
let vidaJefe = 0
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
alma = sprites.create(img`
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
music.setVolume(35)
game.splash("LA ÚLTIMA DEFENSA DE ALMA", "A: dispara | Flechas: mover")
game.showLongText("Damián protege a Alma. Su sangre contiene la cura del virus y 2:12 quiere secuestrarla.", DialogLayout.Full)
puedeJugar = true
comenzarNivel()
game.onUpdate(function () {
    if (nivel == 4 && puedeJugar && vidaJefe > 0) {
        barraJefe.setPosition(jefe.x, jefe.top - 7)
    }
})
game.onUpdateInterval(1400, function () {
    if (nivel != 4 || !(puedeJugar) || vidaJefe <= 0) {
        return
    }
    dx2 = damian.x - jefe.x
    dy2 = damian.y - jefe.y
    distancia2 = Math.max(1, Math.sqrt(dx2 * dx2 + dy2 * dy2))
    let rapidez = vidaJefe <= 10 ? 75 : 50
    let velocidadX = dx2 / distancia2 * rapidez
    let velocidadY = dy2 / distancia2 * rapidez
    veneno2 = sprites.createProjectileFromSprite(img`
        . 7 7 . 
        7 5 5 7 
        7 5 5 7 
        . 7 7 . 
        `, jefe, velocidadX - velocidadY * 0.35, velocidadY + velocidadX * 0.35)
    veneno2.setKind(SpriteKind.Veneno)
    veneno2.lifespan = 3000
    let veneno3 = sprites.createProjectileFromSprite(img`
        . 7 7 . 
        7 5 5 7 
        7 5 5 7 
        . 7 7 . 
        `, jefe, velocidadX + velocidadY * 0.35, velocidadY - velocidadX * 0.35)
    veneno3.setKind(SpriteKind.Veneno)
    veneno3.lifespan = 3000
})

// Música de suspenso: cambia durante la pelea contra el jefe.
game.onUpdateInterval(7000, function () {
    if (!(puedeJugar)) {
        return
    }
    if (nivel == 4) {
        music.playMelody("C B A G A B C5 B ", 180)
    } else {
        music.playMelody("E D E G E D C D ", 160)
    }
})


