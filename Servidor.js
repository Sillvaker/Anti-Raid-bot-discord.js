const
{ 
    AçãoAoCanalDeletado, 
    AçãoAoBanir, 
    AçãoAoExpulsar, 
    AçãoAoEmojiDeletado, 
    AçãoAoCargoDeletado, 
    TempoAoCanalDeletado,
    TempoAoBanir,
    TempoAoExpulsar,
    TempoAoEmojiDeletado,
    TempoAoCargoDeletado,
    PuniçãoAoCanalDeletado,
    PuniçãoAoBanir,
    PuniçãoAoExpulsar,
    PuniçãoAoEmojiDeletado,
    PuniçãoAoCargoDeletado,
    CanalAoCanalDeletado,
    CanalAoBanir,
    CanalAoExpulsar,
    CanalAoEmojiDeletado,
    CanalAoCargoDeletado,
    Logar
} = require('./Configuração.json'),
Discord = require('discord.js'), 
Cliente = new Discord.Client(),
ms = require('ms');
Cliente.login(Logar['Token'])

Cliente.on('ready', () => { console.log(`${Cliente.user.username} iniciado!`) })

let valorCanalDeletado = 0; // Aqui vamos devolver o valor original
Cliente.on('channelDelete', async canal => { // Evento ao qual queremos que acione para manipulação
  
  const user = await canal.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(auditoria => auditoria.entries.first()), // Aqui vamos indentificar quem é o autor que efetuo a ação
  usuario = canal.guild.members.cache.get(user.executor.id) // Vamos emitir o cache desse autor excluio o canal

  valorCanalDeletado++ // Aqui estamos adicionando um valor a mais quando o evento é acionado
  if (valorCanalDeletado === AçãoAoCanalDeletado['QuantidadeAção']) { // Essa matrix é acionado quando o autor chega em seu limite
    valorCanalDeletado = 0; // Aqui vamos devolver o valor original
    if (PuniçãoAoCanalDeletado['Punição'].toLowerCase().includes('ban')) usuario?.ban({ reason: 'Banido(a) pela proteção do sistema!' });
    if (PuniçãoAoCanalDeletado['Punição'].toLowerCase().includes('kick')) usuario?.kick('Expulso(a) pela proteção do sistema!');
    if (PuniçãoAoCanalDeletado['Punição'].toLowerCase().includes('cargo'))  usuario.roles.cache.map(cargo => usuario.roles?.remove(cargo.id));
  }
  setTimeout(() => valorCanalDeletado = 0, ms(TempoAoCanalDeletado['Tempo']));
  canal.guild.channels.cache.get(CanalAoCanalDeletado['CanalLog'])?.send({
    embed: new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Autor: ${usuario.user.tag}\nID: ${usuario.id}\nDeletou: ${canal.name}`)
    .setThumbnail(usuario.user.displayAvatarURL({ 
      dynamic: true 
    }))
  })
})

let valorBan = 0; // Aqui vamos devolver o valor original
Cliente.on('guildMemberRemove', async membro => { // Evento ao qual queremos que acione para manipulação
  
  const user = await membro.guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' }).then(auditoria => auditoria.entries.first()), // Aqui vamos indentificar quem é o autor que efetuo a ação
  usuario = membro.guild.members.cache.get(user.executor.id) // Vamos emitir o cache desse autor baniu o membro

  valorBan++ // Aqui estamos adicionando um valor a mais quando o evento é acionado
  if (valorBan === AçãoAoBanir['QuantidadeAção']) { // Essa matrix é acionado quando o autor chega em seu limite
    valorBan = 0; // Aqui vamos devolver o valor original
    if (PuniçãoAoBanir['Punição'].toLowerCase().includes('ban')) usuario?.ban({ reason: 'Banido(a) pela proteção do sistema!' });
    if (PuniçãoAoBanir['Punição'].toLowerCase().includes('kick')) usuario?.kick('Expulso(a) pela proteção do sistema!');
    if (PuniçãoAoBanir['Punição'].toLowerCase().includes('cargo'))  usuario.roles.cache.map(cargo => usuario.roles?.remove(cargo.id));
  }
  setTimeout(() => valorBan = 0, ms(TempoAoBanir['Tempo']));
  membro.guild.channels.cache.get(CanalAoBanir['CanalLog'])?.send({
    embed: new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Autor: ${usuario.user.tag}\nID: ${usuario.id}\nBaniu: ${membro.user.tag}`)
    .setThumbnail(usuario.user.displayAvatarURL({ 
      dynamic: true 
    }))
  })
})
let valorKick = 0; // Aqui vamos devolver o valor original
Cliente.on('guildMemberRemove', async membro => { // Evento ao qual queremos que acione para manipulação
  
  const user = await membro.guild.fetchAuditLogs({ type: 'MEMBER_KICK' }).then(auditoria => auditoria.entries.first()), // Aqui vamos indentificar quem é o autor que efetuo a ação
  usuario = membro.guild.members.cache.get(user.executor.id) // Vamos emitir o cache desse autor expulsou o membro

  valorKick++ // Aqui estamos adicionando um valor a mais quando o evento é acionado
  if (valorKick === AçãoAoExpulsar['QuantidadeAção']) { // Essa matrix é acionado quando o autor chega em seu limite
    valorKick = 0; // Aqui vamos devolver o valor original
    if (PuniçãoAoExpulsar['Punição'].toLowerCase().includes('ban')) usuario?.ban({ reason: 'Banido(a) pela proteção do sistema!' });
    if (PuniçãoAoExpulsar['Punição'].toLowerCase().includes('kick')) usuario?.kick('Expulso(a) pela proteção do sistema!');
    if (PuniçãoAoExpulsar['Punição'].toLowerCase().includes('cargo'))  usuario.roles.cache.map(cargo => usuario.roles?.remove(cargo.id));
  }
  setTimeout(() => valorKick = 0, ms(TempoAoExpulsar['Tempo']));
  membro.guild.channels.cache.get(CanalAoExpulsar['CanalLog'])?.send({
    embed: new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Autor: ${usuario.user.tag}\nID: ${usuario.id}\nExpulso: ${membro.user.tag}`)
    .setThumbnail(usuario.user.displayAvatarURL({ 
      dynamic: true 
    }))
  })
})
let valorEmojiDeletado = 0; // Aqui vamos devolver o valor original
Cliente.on('emojiDelete', async emoji => { // Evento ao qual queremos que acione para manipulação
  
  const user = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_DELETE' }).then(auditoria => auditoria.entries.first()), // Aqui vamos indentificar quem é o autor que efetuo a ação
  usuario = emoji.guild.members.cache.get(user.executor.id) // Vamos emitir o cache desse autor excluio o emoji

  valorEmojiDeletado++ // Aqui estamos adicionando um valor a mais quando o evento é acionado
  if (valorEmojiDeletado === AçãoAoEmojiDeletado['QuantidadeAção']) { // Essa matrix é acionado quando o autor chega em seu limite
    valorEmojiDeletado = 0; // Aqui vamos devolver o valor original
    if (PuniçãoAoEmojiDeletado['Punição'].toLowerCase().includes('ban')) usuario?.ban({ reason: 'Banido(a) pela proteção do sistema!' });
    if (PuniçãoAoEmojiDeletado['Punição'].toLowerCase().includes('kick')) usuario?.kick('Expulso(a) pela proteção do sistema!');
    if (PuniçãoAoEmojiDeletado['Punição'].toLowerCase().includes('cargo'))  usuario.roles.cache.map(cargo => usuario.roles?.remove(cargo.id));
  }
  setTimeout(() => valorEmojiDeletado = 0, ms(TempoAoEmojiDeletado['Tempo']));
  emoji.guild.channels.cache.get(CanalAoEmojiDeletado['CanalLog'])?.send({
    embed: new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Autor: ${usuario.user.tag}\nID: ${usuario.id}\nDeletou: ${emoji.name}`)
    .setThumbnail(usuario.user.displayAvatarURL({ 
      dynamic: true 
    }))
  })
})
let valorCargoDeletado = 0; // Aqui vamos devolver o valor original
Cliente.on('roleDelete', async cargo => { // Evento ao qual queremos que acione para manipulação
  
  const user = await cargo.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(auditoria => auditoria.entries.first()), // Aqui vamos indentificar quem é o autor que efetuo a ação
  usuario = cargo.guild.members.cache.get(user.executor.id) // Vamos emitir o cache desse autor excluio o cargo
  
  valorCargoDeletado++ // Aqui estamos adicionando um valor a mais quando o evento é acionado
  if (valorCargoDeletado === AçãoAoCargoDeletado['QuantidadeAção']) { // Essa matrix é acionado quando o autor chega em seu limite
    valorCargoDeletado = 0; // Aqui vamos devolver o valor original
    if (PuniçãoAoCargoDeletado['Punição'].toLowerCase().includes('ban')) usuario?.ban({ reason: 'Banido(a) pela proteção do sistema!' });
    if (PuniçãoAoCargoDeletado['Punição'].toLowerCase().includes('kick')) usuario?.kick('Expulso(a) pela proteção do sistema!');
    if (PuniçãoAoCargoDeletado['Punição'].toLowerCase().includes('cargo'))  usuario.roles.cache.map(cargo => usuario.roles?.remove(cargo.id));
  }
  setTimeout(() => valorCargoDeletado = 0, ms(TempoAoCargoDeletado['Tempo']));
  cargo.guild.channels.cache.get(CanalAoCargoDeletado['CanalLog'])?.send({
    embed: new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Autor: ${usuario.user.tag}\nID: ${usuario.id}\nDeletou: ${cargo.name}`)
    .setThumbnail(usuario.user.displayAvatarURL({ 
      dynamic: true 
    }))
  })
});
