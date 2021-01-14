module.exports = async function (db, {
  proffyValue,
  classValue,
  classScheduleValues
}) {
  // inserir dados na tabela de teacher
  const insertedProffy = await db.run(`
    INSERT INTO proffys (
      name, 
      avatar, 
      whatsapp, 
      bio
    ) VALUES (
      "${proffyValue.name}",
      "${proffyValue.avatar}",
      "${proffyValue.whatsapp}",
      "${proffyValue.bio}"
    );
  `)


  // inserir dados na tabela classes
  const proffy_id = insertedProffy.lastID

  const insertedClass = await db.run(`
  INSERT INTO classes (
    subject, 
    cost, 
    proffy_id
  ) VALUES (
    "${classValue.subject}",
    "${classValue.cost}",
    "${proffy_id}"
  );
  `)

  // inserir dados na tabela class_schedule
  const class_id = insertedClass.lastID

  const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
        ) VALUES (
          "${class_id}",
          "${classScheduleValue.weekday}",
          "${classScheduleValue.time_from}",
          "${classScheduleValue.time_to}"
        );
    `)
  })

  // espera executar todos os db.run() das class_schedules
  await Promise.all(insertedAllClassScheduleValues);
}