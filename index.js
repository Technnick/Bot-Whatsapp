const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const {
    color,
    bgcolor
} = require('./lib/color')
const {
    mhentai
} = require('./src/mhentai')
const {
    help
} = require('./src/help')
const {
    wait,
    simih,
    getBuffer,
    h2k,
    generateMessageID,
    getGroupAdmins,
    getRandom,
    banner,
    start,
    info,
    success,
    close
} = require('./lib/functions')
const {
    fetchJson
} = require('./lib/fetcher')
const {
    recognize
} = require('./lib/ocr')
const fs = require('fs')
const appanime = JSON.parse(fs.readFileSync('./src/appanime.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio.json'))
const trap = JSON.parse(fs.readFileSync('./src/trap.json'))
const land = JSON.parse(fs.readFileSync('./src/land.json'))
const yuri = JSON.parse(fs.readFileSync('./src/yuri.json'))
const yaoi = JSON.parse(fs.readFileSync('./src/yaoi.json'))
const moment = require('moment-timezone')
const {
    exec
} = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const {
    removeBackgroundFromImageFile
} = require('remove.bg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
prefix = '.'
blocked = []

function kyun(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }

    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

function addMetadata(packname, author) {
    if (!packname) packname = 'Bot'; if (!author) author = 'Bot';   
    author = author.replace(/[^a-zA-Z0-9]/g, '');   
    let name = `${author}_${packname}`
    if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
    const json = {  
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
    }
    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])  
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]  

    let len = JSON.stringify(json).length   
    let last

    if (len > 256) {    
        len = len - 256 
        bytes.unshift(0x01) 
    } else {    
        bytes.unshift(0x00) 
    }   

    if (len < 16) { 
        last = len.toString(16) 
        last = "0" + len    
    } else {    
        last = len.toString(16) 
    }   

    const buf2 = Buffer.from(last, "hex")   
    const buf3 = Buffer.from(bytes) 
    const buf4 = Buffer.from(JSON.stringify(json))  

    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])  

    fs.writeFileSync(`./src/stickers/${name}.exif`, buffer, (err) => {  
        return `./src/stickers/${name}.exif`
    })
}

async function starts() {
    const client = new WAConnection()
    client.logger.level = 'warn'
    console.log(banner.string)
    client.on('qr', () => {
        console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan the qr code above'))
    })

    fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
    client.on('connecting', () => {
        start('2', 'Connecting...')
    })
    client.on('open', () => {
        success('2', 'Connected')
    })
    await client.connect({
        timeoutMs: 30 * 1000
    })
    fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

    client.on('group-participants-update', async (anu) => {
        if (!welkom.includes(anu.jid)) return
        try {
            const mdata = await client.groupMetadata(anu.jid)
            console.log(anu)
            if (anu.action == 'add') {
                num = anu.participants[0]
                try {
                    ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
                } catch {
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }




                teks = `_*SEJA BEM VINDO (A)!*_ @${num.split('@')[0]}\n*⚔️🛡️Ʀᴇιno Ꮃ∆Ʀ - InFoRmA:*

_Para que todos possamos desfrutar de um verdadeiro grupo de entretenimento, logo abaixo temos algumas regras para manter aquele padrão que você só encontra aqui, nesse Reino MaWaRvilhoso!_

*De acordo com o Decreto Animalesco NacionWaR:*

🛡️ *Lei de n°01 art.01 parágrafo primeiro:*
_Está veemente *proibido* pornografia em qualquer um de seus âmbitos,seja foto,vídeo ou hentai._

🛡️ *Lei de n°02 art.02 parágrafo segundo:*
_*Não poderás invadir* o pv dos demais membros sem autorização prévia._
_(Toda dúvida sobre o grupo deverá ser esclarecida por Animal,Aizen,Ackerman e Niele)_

🛡️ *Lei de n°03 art.03 parágrafo terceiro:*
_*Não pode* haver qualquer tipo de discriminação ou intolerância para com os membros._

🛡️ *Lei de n°04 art.04 parágrafo quarto:*
_Que seja *evitada* qualquer briga no ambiente deste grupo._

🛡️ *Lei de n°05 art.05 parágrafo quinto:*
_A interação no grupo é algo que prezamos,portanto a inatividade sem nenhum motivo,estará sujeita a BAN._

🛡️ *Lei de n°06 art.06 parágrafo sexto:*
_É *proibido* soltar links das suas redes sociais e/ou links não confiáveis sem autorização prévia dos adms citados acima._

🛡️ *Lei de n°07 art.07 parágrafo sétimo:*
_Números fake ou de fora do Brasil só poderão entrar e/ou permanecer no grupo com autorização prévia dos mesmos adms citados nesse documento._

🛡️ *Lei de n°08 art.08 parágrafo oitavo:*
_O uso do *Bom Senso* é e sempre será bem vindo aqui!_

🛡️ *Lei Marcial nº1 Anti-ghosticismo, Parágrafo Único*

*§1* Em caso de remoção por ghosticismo/inatividade crônica. (Ou motivo julgado em conselho) o infrator somente retornará após pagar a prenda determinada diante de consenso e gravidade decidida pelo *Conselho dos Dracos*

*Anexo 1-*  _Punições Severas_ *Não haverá  janela de retorno. E Banimento em toda extensão da rede.*

. *${mdata.subject}*`

                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id, buff, MessageType.image, {
                    caption: teks,
                    contextInfo: {
                        "mentionedJid": [num]
                    }
                })
            } else if (anu.action == 'remove') {
                num = anu.participants[0]
                try {
                    ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
                } catch {
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                teks = `Saiu do Reino @${num.split('@')[0]}👋`
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id, buff, MessageType.image, {
                    caption: teks,
                    contextInfo: {
                        "mentionedJid": [num]
                    }
                })
            }
        } catch (e) {
            console.log('Error : %s', color(e, 'red'))
        }
    })

    client.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us', 's.whatsapp.net'))
        }
    })

    client.on('chat-update', async (mek) => {
        try {
            if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
            if (!mek.message) return
            if (mek.key && mek.key.remoteJid == 'status@broadcast') return
            if (mek.key.fromMe) return
            global.prefix
            global.blocked
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
            const type = Object.keys(mek.message)[0]
            const apiKey = 'Your-Api-Key'
            const {
                text,
                extendedText,
                contact,
                location,
                liveLocation,
                image,
                video,
                sticker,
                document,
                audio,
                product
            } = MessageType
            const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''

            const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)

            mess = {
                wait: 'Só um momento!',
                success: 'Selo ༒🛡️Reino War⚔️༒ de qualidade',
                error: {
                    stick: 'A figurinha é muito grande ou pesada, tente outra :x',
                    Iv: 'LINK INVÁLIDO'
                },
                only: {
                    group: '❌ Aqui nao é o Reino War ❌',
                    ownerG: 'Somente os ADMs do Reino War podem usar este comando',
                    ownerB: 'Somente Admins podem usar esse comando',
                    admin: 'Somente Admins podem usar esse comando',
                    Badmin: 'Preciso ser Admin para executar este comando!'
                }
            }

            const botNumber = client.user.jid
            const ownerNumber = ["558398527324@s.whatsapp.net"]
            const speed = require('performance-now')
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? mek.participant : mek.key.remoteJid
            const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId = isGroup ? groupMetadata.jid : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
            const groupDesc = isGroup ? groupMetadata.desc : ''
            const isWelkom = isGroup ? welkom.includes(from) : false
            const isSimi = isGroup ? samih.includes(from) : false
            const isOwner = ownerNumber.includes(sender)
            const isUrl = (url) => {
                return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
            }
            const reply = (teks) => {
                client.sendMessage(from, teks, text, {
                    quoted: mek
                })
            }
            const sendMess = (hehe, teks) => {
                client.sendMessage(hehe, teks, text)
            }
            const mentions = (teks, memberr, id) => {
                (id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {
                    contextInfo: {
                        "mentionedJid": memberr
                    }
                }): client.sendMessage(from, teks.trim(), extendedText, {
                    quoted: mek,
                    contextInfo: {
                        "mentionedJid": memberr
                    }
                })
            }

            colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
            if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
            if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
            if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))

            switch (command) {
                case 'menuwar':
                    client.sendMessage(from, help(prefix), text)
                    break
                case 'mhentai':
                case 'menunsfw':
                    client.sendMessage(from, mhentai(prefix), text)
                    break

                case 'infogp':
                    client.updatePresence(from, Presence.composing)
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    try {
                        ppimg = await client.getProfilePicture(from)
                    } catch {
                        ppimg = 'https://i.ibb.co/NthF8ds/IMG-20201223-WA0740.jpg'
                    }
                    let buf = await getBuffer(ppimg)
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += `${groupName}\n
					${groupDesc}\n*Número de Administradores:* ${groupAdmins.length}\n*Número de membros:* ${groupMembers.length}`
                    no = 0
                    for (let admon of groupAdmins) {
                        no += 1
                        teks += `[${no.toString()}]`
                    }
                    client.sendMessage(from, buf, image, {
                        quoted: mek,
                        caption: teks
                    })
                    break

                case 'getaud':
                    namastc = body.slice(7)
                    buffer = fs.readFileSync(`./strg/audio/${namastc}.mp3`)
                    client.sendMessage(from, buffer, audio, {
                        mimetype: 'audio/mp4',
                        quoted: mek,
                        ptt: true
                    })
                    break

                case 'trap':
                    list_image = [];
                    fs.readdir("./strg/image/", (erro, images) => {
                        if (erro) {
                            console.log("erro");
                        }

                        buffer = fs.readFileSync("./strg/image/" + images[Math.floor(Math.random() * images.length)])
                        client.sendMessage(from, buffer, image, {
                            mimetype: 'image/jpg',
                            quoted: mek,
                            ptt: true
                        })
                    });
                    break

                case 'gethentai':
                    list_pdf = [];
                    fs.readdir("./strg/document/", (erro, pdfs) => {
                        if (erro) {
                            console.log("erro");
                        }

                        buffer = fs.readFileSync("./strg/document/" + pdfs[Math.floor(Math.random() * pdfs.length)])
                        client.sendMessage(from, buffer, document, {
                            mimetype: 'application/pdf',
                            quoted: mek,
                            ptt: true
                        })
                    });
                    break

                case 'gapp':
                    namastc = body.slice(5).trim()
                    buffer = fs.readFileSync(`./strg/document/apps/animes/${namastc}.apk`)
                    client.sendMessage(from, buffer, document, {
                        mimetype: 'application/apk',
                        quoted: mek,
                        ptt: true
                    })
                    break

                case 'appsanime':
                    teks = '┏━━❉ *Lista de Apps* ❉━━\n\n'
                    for (let awokwkwk of appanime) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total: ${appanime.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": appanime
                        }
                    })
                    break

                case 'gtrap':
                case 'gfuta':
                    namastc = body.slice(6).trim()
                    buffer = fs.readFileSync(`./strg/document/trap/${namastc}.pdf`)
                    client.sendMessage(from, buffer, document, {
                        mimetype: 'application/pdf',
                        quoted: mek,
                        ptt: true
                    })
                    break

                case 'dtrapfuta':
                    teks = '┏━━❉ *Doujins Trap & Futa* ❉━━\n\n'
                    for (let awokwkwk of trap) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total: ${trap.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": trap
                        }
                    })
                    break

                case 'gyuri':
                    namastc = body.slice(6).trim()
                    buffer = fs.readFileSync(`./strg/document/yuri/${namastc}.pdf`)
                    client.sendMessage(from, buffer, document, {
                        mimetype: 'application/pdf',
                        quoted: mek,
                        ptt: true
                    })
                    break

                case 'dyuri':
                    teks = '┏━━❉ *Doujins Yuri* ❉━━\n\n'
                    for (let awokwkwk of yuri) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total: ${yuri.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": yuri
                        }
                    })
                    break

                case 'gyaoi':
                    namastc = body.slice(6).trim()
                    buffer = fs.readFileSync(`./strg/document/yaoi/${namastc}.pdf`)
                    client.sendMessage(from, buffer, document, {
                        mimetype: 'application/pdf',
                        quoted: mek,
                        ptt: true
                    })
                    break

                case 'dyaoi':
                    teks = '┏━━❉ *Doujins Yaoi* ❉━━\n\n'
                    for (let awokwkwk of yaoi) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total: ${yaoi.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": yaoi
                        }
                    })
                    break

                case 'gloli':
                    namastc = body.slice(6).trim()
                    buffer = fs.readFileSync(`./strg/document/land/${namastc}.pdf`)
                    client.sendMessage(from, buffer, document, {
                        mimetype: 'application/pdf',
                        quoted: mek,
                        ptt: true
                    })
                    break

                case 'dlolishota':
                    teks = '┏━━❉ *Doujins Loli & Shota* ❉━━\n\n'
                    for (let awokwkwk of land) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total: ${land.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": land
                        }
                    })
                    break

                case 'pinterest':
                    tels = body.slice(11)

                    client.updatePresence(from, Presence.composing)
                    data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {
                        method: 'get'
                    })
                    reply(mess.wait)
                    n = JSON.parse(JSON.stringify(data));
                    nimek = n[Math.floor(Math.random() * n.length)];
                    pok = await getBuffer(nimek)
                    client.sendMessage(from, pok, image, {
                        quoted: mek,
                        caption: `*PINTEREST*\n\*Pesquisa:* *${tels}*`
                    })
                    await limitAdd(sender)
                    break

                case 'blocklist':
                    teks = 'ESTA É A LISTA DE NUMEROS BLOQUEADOS:\n'
                    for (let block of blocked) {
                        teks += `~> @${block.split('@')[0]}\n`
                    }
                    teks += `Total : ${blocked.length}`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": blocked
                        }
                    })
                    break

                case 'apagar':
                case 'del':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    client.deleteMessage(from, {
                        id: mek.message.extendedTextMessage.contextInfo.stanzaId,
                        remoteJid: from,
                        fromMe: true
                    })
                    break

                case 'fechar':
                    client.updatePresence(from, Presence.composing)
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    var nomor = mek.participant
                    const close = {
                        text: `Grupo fechado pelo administrador @${nomor.split("@s.whatsapp.net")[0]}\nagora *apenas administradores* podem enviar mensagens`,
                        contextInfo: {
                            mentionedJid: [nomor]
                        }
                    }
                    client.groupSettingChange(from, GroupSettingChange.messageSend, true);
                    reply(close)
                    break

                case 'abrir':
                    client.updatePresence(from, Presence.composing)
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    open = {
                        text: `Grupo aberto pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,
                        contextInfo: {
                            mentionedJid: [sender]
                        }
                    }
                    client.groupSettingChange(from, GroupSettingChange.messageSend, false)
                    client.sendMessage(from, open, text, {
                        quoted: mek
                    })
                    break

                case 'ping':
                    if (!isGroup) return reply(mess.only.group)
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    client.updatePresence(from, Presence.composing)
                    uptime = process.uptime()
                    client.sendMessage(from, `Speed: *_${latensi.toFixed(4)}ms_*`, text, {
                        quoted: mek
                    })
                    break

                case 'play':
                    reply(mess.wait)
                    play = body.slice(5)
                    anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
                    if (anu.error) return reply(anu.error)
                    infomp3 = `┏━━❉ *༒🛡️Ʀᴇιno Ꮃ∆Ʀ⚔️༒* ❉━━\nTítulo: ${anu.result.title}\nFonte: ${anu.result.source}\nTamanho: ${anu.result.size}\n\n*🎧coloque o fone, ajuste o volume e curta a música♪🎶*`
                    buffer = await getBuffer(anu.result.thumbnail)
                    lagu = await getBuffer(anu.result.url_audio)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek,
                        caption: infomp3
                    })
                    client.sendMessage(from, lagu, audio, {
                        mimetype: 'audio/mp4',
                        filename: `${anu.title}.mp3`,
                        quoted: mek
                    })
                    break

                case 'ttsoff':
                    client.updatePresence(from, Presence.recording)
                    if (args.length < 1) return client.sendMessage(from, 'Qual é o código da linguagem?', text, {
                        quoted: mek
                    })
                    const gtts = require('./lib/gtts')(args[0])
                    if (args.length < 2) return client.sendMessage(from, 'Cadê o texto', text, {
                        quoted: mek
                    })
                    dtt = body.slice(8)
                    ranm = getRandom('.mp3')
                    rano = getRandom('.ogg')
                    dtt.length > 600 ?
                        reply('Textnya kebanyakan om') :
                        gtts.save(ranm, dtt, function() {
                            exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
                                fs.unlinkSync(ranm)
                                buff = fs.readFileSync(rano)
                                if (err) return reply('Gagal om:(')
                                client.sendMessage(from, buff, audio, {
                                    quoted: mek,
                                    ptt: true
                                })
                                fs.unlinkSync(rano)
                            })
                        })
                    break

                case 'war':
                case 'tagall':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    members_id = []
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += '\n\n'
                    for (let mem of groupMembers) {
                        teks += `*#* @${mem.jid.split('@')[0]}\n`
                        members_id.push(mem.jid)
                    }
                    mentions(teks, members_id, true)
                    break
                case 'war2':
                    members_id = []
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += '\n\n'
                    for (let mem of groupMembers) {
                        teks += `╠➥ @${mem.jid.split('@')[0]}\n`
                        members_id.push(mem.jid)
                    }
                    reply(teks)
                    break
                case 'war3':
                    members_id = []
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += '\n\n'
                    for (let mem of groupMembers) {
                        teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
                        members_id.push(mem.jid)
                    }
                    client.sendMessage(from, teks, text, {
                        detectLinks: false,
                        quoted: mek
                    })
                    break

                case 'clearall':
                    if (!isOwner) return reply('Somente o criador pode usar este comando')
                    anu = await client.chats.all()
                    client.setMaxListeners(25)
                    for (let _ of anu) {
                        client.deleteChat(_.jid)
                    }
                    reply('Todos os chats foram limpos com sucesso!')
                    break

                case 'promover':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Promovido para Admin\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(from, mentioned, true)
                        client.groupRemove(from, mentioned)
                    } else {
                        mentions(`Promoveu @${mentioned[0].split('@')[0]} a ADM do grupo`, mentioned, true)
                        client.groupMakeAdmin(from, mentioned)
                    }
                    break
                case 'rebaixar':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Perdeu o cargo de Admin\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        client.groupRemove(from, mentioned)
                    } else {
                        mentions(`Retirou @${mentioned[0].split('@')[0]} do cargo de ADM`, mentioned, true)
                        client.groupDemoteAdmin(from, mentioned)
                    }
                    break

                case 'add':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (args.length < 1) return reply('Qual o número?')
                    if (args[0].startsWith('08')) return reply('Número incorreto')
                    try {
                        num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
                        client.groupAdd(from, [num])
                    } catch (e) {
                        console.log('Error :', e)
                        reply('O número é privado')
                    }
                    break

                case 'remover':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Use o comando novamente e marque quem quer que eu remova')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Foi removido do Reino:\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        client.groupRemove(from, mentioned)
                    } else {
                        mentions(`Foi removido do Reino : @${mentioned[0].split('@')[0]}`, mentioned, true)
                        client.groupRemove(from, mentioned)
                    }
                    break

                case 'admins':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    teks = `Lista de adms *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
                    no = 0
                    for (let admon of groupAdmins) {
                        no += 1
                        teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
                    }
                    mentions(teks, groupAdmins, true)
                    break

                case 'linkgp':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/' + linkgc)
                    break

                case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                        client.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break

                case 'toimg':
                    if (!isQuotedSticker) return reply('Você precisa marcar uma figurinha com esse comando')
                    reply(mess.wait)
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.png')
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return reply('Falha ao converter figurinha em imagem')
                        buffer = fs.readFileSync(ran)
                        client.sendMessage(from, buffer, image, {
                            quoted: mek,
                            caption: '>//<'
                        })
                        fs.unlinkSync(ran)
                    })
                    break


                case 'portal':
                    if (args.length < 1) return reply(`◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤    
  *🛡️Ʀᴇιno Ꮃ∆Ʀ - 4ЄƔЄƦ⚔️*
◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤

            Esta é a história de um Reino perdido e sua cidade capital *WARkanda* , aqui bravos heróis e poderosas heroínas se reúnem para uma luta incessante contra um mal quase sem nome, apenas conhecido Diatédiosus.
          Agora o Reino convida a você para mudar nossa história, para mudar os rumos da guerra! Entre nessa estrada, a 
    *_Estrada da Guerra dos Animes_*

              _*...de volta as origens*_

 _Use as Runas_ *£&£* e acesse o *£ink £endário*

https://chat.whatsapp.com/I90BVZGmMP42fntOYY8n7J

◇───────◇──────◇`)
                    break

                case 'viajante':
                    namastc = body.slice(9)
                    buffer = fs.readFileSync(`./strg/image/zoro.jpeg`)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek,
                        caption: `Result From DDatabas: zoro.jpeg`
                    })
                    break

                case 'parceiros':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply(`*_Confira Nossas Redes Sociais:_*

*🛡️⚔️FACE-PAGE*
*_https://www.facebook.com/waranimes.sa_*

*🛡️⚔️FACE-GRUPO*
*_https://www.facebook.com/groups/430872791079792/_*

🛡️⚔️ *Grupo (parceiro) de Conteúdo +18*
*https://chat.whatsapp.com/I4ry36k8hOe37xIYL8HhCi*

*🛡️⚔️TELEGRAM*

*༒Ʀᴇιno Ꮃ∆Ʀ - Chat⚔️🛡️*
*_https://t.me/CNWAR4EVER_*

*Canais:*

*🍁🍃𝓐𝓷𝓲𝓶𝓮𝓼.𝓒𝓝🍃🍁*
*_https://t.me/AnimesCN_*

*🍁🍃𝓢𝓮𝓻𝓲𝓮𝓼 𝓮 𝓕𝓲𝓵𝓶𝓮𝓼-𝓐𝓷𝓲𝓶𝓮𝓼.𝓒𝓝🍃🍁*
*https://t.me/SeriesCN*


*༒🛡️Ʀᴇιno Ꮃ∆Ʀ - 4ЄƔЄƦ⚔️༒*`)
                    break
                case 'welcome':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply('Hmmmm')
                    if (Number(args[0]) === 1) {
                        if (isWelkom) return reply('Welcome já está ativado!')
                        welkom.push(from)
                        fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
                        reply('A mensagem de boas vindas foi ligada!')
                    } else if (Number(args[0]) === 0) {
                        welkom.splice(from, 1)
                        fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
                        reply('A mensagem de boas vindas foi desligada!')
                    } else {
                        reply('A mensagem de boas vindas foi ligada!')
                    }
                    break

                case 'clone':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply('Use novamente com o @ alvo')
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                    let {
                        jid, id, notify
                    } = groupMembers.find(x => x.jid === mentioned)
                    try {
                        pp = await client.getProfilePicture(id)
                        buffer = await getBuffer(pp)
                        client.updateProfilePicture(botNumber, buffer)
                        mentions(`Foto de perfil copiada de @${id.split('@')[0]} com sucesso!`, [jid], true)
                    } catch (e) {
                        reply('Gagal om')
                    }
                    break

                case 'wait':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        reply(mess.wait)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        media = await client.downloadMediaMessage(encmedia)
                        await wait(media).then(res => {
                            client.sendMessage(from, res.video, video, {
                                quoted: mek,
                                caption: res.teks.trim()
                            })
                        }).catch(err => {
                            reply(err)
                        })
                    } else {
                        reply('Apenas fotos')
                    }
                    break

                case 'newpack':
                    /*if(!isOwner){
                        reply("Apenas o dono do bot pode usar este comando!")
                    }*/
                    if(args.length < 2){
                        reply("Por favor, envie o nome do pacote e o autor!")
                    }
                    else {
                        let packname = args[0]
                        let author_name = args[1]
                        if(fs.existsSync('./src/sticker_packages_names.json')){
                            sticker_packages_names = JSON.parse(fs.readFileSync('./src/sticker_packages_names.json'))
                            sticker_keys = Object.keys(sticker_packages_names);
                            j = parseInt(sticker_keys[sticker_keys.length - 1]) + 1;
                            sticker_packages_names[j] = [packname, author_name]
                            fs.writeFileSync('./src/sticker_packages_names.json', JSON.stringify(sticker_packages_names))
                        } else {
                            console.log("here")
                            new_package_file = {
                                0: [packname, author_name],
                            };
                            fs.writeFileSync('./src/sticker_packages_names.json', JSON.stringify(new_package_file))
                        }
                        reply("Pacote criado com sucesso!")
                    }
                    break

                case 'figu':
                case 'fig':
                case 'f':
                case 'sticker':
                    package = null
                    if (args.length > 0){
                        packnames = JSON.parse(fs.readFileSync("./src/sticker_packages_names.json"))
                        obj_keys = Object.keys(packnames)
                        for(let i = 0; i < obj_keys.length; i++){
                            k = obj_keys[i]
                            archived = packnames[k]
                            if(archived[0] == args[0]){
                                package = archived
                            }   
                        }
                    }
                        
                    author = "mogumogu"
                    packname = "random"
                    if(package !== null){
                        author = package[1]
                        packname = package[0]
                    }
                    //console.log(addMetadata(packname, author))
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        await ffmpeg(`./${media}`)
                            .input(media)
                            .on('start', function(cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function(err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                reply(mess.error.stick)
                            })
                            .on('end', function() {
                                console.log("finalizando 1")
                                exec(`webpmux -set exif ${addMetadata(packname, author)} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                    fs.unlinkSync(media)    
                                    fs.unlinkSync(ran)  
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        reply(mess.wait)
                        await ffmpeg(`./${media}`)
                            .inputFormat(media.split('.')[1])
                            .on('start', function(cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function(err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                                reply(`❌ Falhou, no momento da conversão ${tipe} para o adesivo`)
                            })
                            .on('end', function() {
    
                                exec(`webpmux -set exif ${addMetadata(packname, author)} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                    fs.unlinkSync(media)    
                                    fs.unlinkSync(ran)  
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ranw = getRandom('.webp')
                        ranp = getRandom('.png')
                        reply(mess.wait)
                        keyrmbg = 'Your-ApiKey'
                        await removeBackgroundFromImageFile({
                            path: media,
                            apiKey: keyrmbg.result,
                            size: 'auto',
                            type: 'auto',
                            ranp
                        }).then(res => {
                            fs.unlinkSync(media)
                            let buffer = Buffer.from(res.base64img, 'base64')
                            fs.writeFileSync(ranp, buffer, (err) => {
                                if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
                            })
                            exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                                fs.unlinkSync(ranp)
                                if (err) return reply(mess.error.stick)
                                client.sendMessage(from, fs.readFileSync(ranw), sticker, {
                                    quoted: mek
                                })
                            })
                        })
                        /*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
                            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadAndSaveMediaMessage(encmedia)
                            ran = getRandom('.webp')
                            await ffmpeg(`./${media}`)
                                .on('start', function (cmd) {
                                    console.log('Started :', cmd)
                                })
                                .on('error', function (err) {
                                    fs.unlinkSync(media)
                                    console.log('Error :', err)
                                })
                                .on('end', function () {
                                    console.log('Finish')
                                    fs.unlinkSync(media)
                                    client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                    fs.unlinkSync(ran)
                                })
                                .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(ran)*/
                    } else {
                        reply(`Envie fotos com legendas *.f* ou marque uma imagem que já foi enviada`)
                    }
                    break

                default:
                    if (isGroup && isSimi && budy != undefined) {
                        console.log(budy)
                        muehe = await simih(budy)
                        console.log(muehe)
                        reply(muehe)
                    } else {
                        return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
                    }
            }
        } catch (e) {
            console.log('Error : %s', color(e, 'red'))
        }
    })
}
starts()