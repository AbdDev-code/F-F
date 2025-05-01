const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// get home data
const getDataHome = async (req,res)=>{
  const data = await prisma.home.findMany()
  if (!data) {
    return res.status(404).json({ message: 'No data found' });
  }

  res.status(200).json(data)
}

// create data home
const createDataHome = async (req,res)=>{
  const {title, desc, img } = req.body;
  
  const data = await prisma.home.create({
    data: {
      title,
      desc,
      img,
    }
  })
  if (!data) {
    return res.status(400).json({ message: 'Failed to create data' });
  }
  res.status(201).json({
    message: 'Data created successfully',
    data:data,
  })
}

// update data home
const updateDataHome = async (req,res)=>{
  const {id} = req.params
  const {title, desc, img } = req.body;
  if(!id){
    return res.status(404).json({
      message:"Id required",
      success:false
    })
  }
  const oldData = await  prisma.home.findUnique({where:{id:id}})
  
  const data = await prisma.home.update({
    where: {
      id:id,
    },
    data: {
      title: title || oldData.title,
      desc: desc || oldData.desc,
      img: img || oldData.img,
    }
  })
  if (!data) {
    return res.status(400).json({ message: 'Failed to update data' });
  }
  res.status(200).json({
    success:true,
    message: 'Data updated successfully',
    data:data,
  })
}

// delete home data 
const deleteHomeData = async (req,res)=>{
    const {id} = req.params
    if(id){
      res.status(404).json({
        message:"Id required",
        success:false
      })
    }

    const deletedData = await prisma.home.deleteMany({where:{id}})
    if(!deletedData){
      res.status(400).json({
        message:"Home data not deleted",
        success:false
      })
    }
    res.status(200).json({
      success:true,
      message:"Home data deleted successfull"
    })
}

// --------------------------------------------------   About    ---------------------------------------------------------- //


// Create 
const createAboutData = async (req, res) => {
  const { title, desc1, desc2, img } = req.body;
  
  const data = await prisma.about.create({
    data: {
      title,
      desc1,
      desc2,
      img,
    },
  });
  res.status(201).json({ message: 'About data created', data });
};

//  Get 
const getAboutData = async (req, res) => {
  const data = await prisma.about.findMany();
  if (!data.length) {
    return res.status(404).json({ message: "No about data found" });
  }
  res.status(200).json(data);
};


// Update
const updateAboutData = async (req, res) => {
  const { id } = req.params;
  const old = await prisma.about.findUnique({ where: { id: id } });
  if (!old) return res.status(404).json({ message: "About not found" });

  const { title, desc1, desc2, img } = req.body;
  const updated = await prisma.about.update({
    where: { id:id },
    data: {
      title: title || old.title,
      desc1: desc1 || old.desc1,
      desc2: desc2 || old.desc2,
      img: img || old.img,
    },
  });
  res.status(200).json({ message: "Updated successfully", data: updated });
};


// Dalete
const deleteAboutData = async (req, res) => {
  const { id } = req.params;
  await prisma.about.delete({ where: { id: id } });
  res.status(200).json({ message: "About deleted successfully" });
};


// ----------------------------------------------------  Contact  -------------------------------------------------------- //

// create contact Data
const createContactData = async (req, res) => {
  const { number, email, address, desc } = req.body;
  if (!number || !email || !address || !desc) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const data = await prisma.contact.create({
    data: { number, email, address, desc },
  });
  res.status(201).json({ message: 'Contact data created', data });
};

// Get
const getContactData = async (req, res) => {
  const data = await prisma.contact.findMany();
  if (!data.length) return res.status(404).json({ message: "No contact data found" });
  res.status(200).json(data);
};

// Update 
const updateContactData = async (req, res) => {
  const { id } = req.params;
  const old = await prisma.contact.findUnique({ where: { id: id } });
  if (!old) return res.status(404).json({ message: "Contact not found" });

  const { number, email, address, desc } = req.body;
  const updated = await prisma.contact.update({
    where: { id: id },
    data: {
      number: number || old.number,
      email: email || old.email,
      address: address || old.address,
      desc: desc || old.desc,
    },
  });
  res.status(200).json({ message: "Updated successfully", data: updated });
};


// delete
const deleteContactData = async (req, res) => {
  const { id } = req.params;
  await prisma.contact.delete({ where: { id: id } });
  res.status(200).json({ message: "Contact deleted successfully" });
};



// ---------------------------------------------------  Blog ------------------------------------------------------------- //


// create blog DATA
const createBlogData = async (req, res) => {
  const { title, cards } = req.body;
  
  const data = await prisma.blog.create({
    data: {
      title,
      cards: {
        createMany: {
          data: cards.map(card => ({
            title: card.title,
            desc: card.desc, 
            img: card.img,
            status: card.status,
            date: new Date(card.date || Date.now()).toISOString()
          })),
        },
      },
    },
    include: { cards: true },
  });
  res.status(201).json({ message: 'Blog created', data });
};

// Get
const getBlogData = async (req, res) => {
  const data = await prisma.blog.findMany({ include: { cards: true } });
  if (!data.length) return res.status(404).json({ message: "No blog data found" });
  res.status(200).json(data);
};

// Update
const updateBlogCard = async (req, res) => {
  const { id } = req.params; // card id

  const { title, desc, img, status, date } = req.body;
  const updated = await prisma.blogCard.update({
    where: { id: id },
    data: {
      title: title || old.title,
      desc: desc || old.desc,
      img: img || old.img,
      status: status || old.status,
      date: date || old.date,
    },
  });
  res.status(200).json({ message: "Card updated", data: updated });
};


// delete 
const deleteBlogCard = async (req, res) => {
  const { id } = req.params;
  await prisma.card.delete({ where: { id: id } });
  res.status(200).json({ message: "Card deleted" });
};




//  -------------------------------------------------------------- Privacy -----------------------------------------------------  //


// Create privacy Data
const createPrivacyData = async (req, res) => {
  const { title, policy, disclaimer } = req.body;
  if (!title || !Array.isArray(policy) || !Array.isArray(disclaimer)) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const data = await prisma.privacy.create({
    data: {
      title,
      policy: {
        createMany: {
          data: policy.map(item => ({
            title: item.title,
            desc: item.desc, // `p` => `desc`
          })),
        },
      },
      disclaimer: {
        createMany: {
          data: disclaimer.map(item => ({
            title: item.title,
            desc: item.desc, // `p` => `desc`
          })),
        },
      },
    },
    include: { policy: true, disclaimer: true },
  });

  res.status(201).json({ message: 'Privacy data created', data });
};

// Create  policy
const createPolicyItem = async (req, res) => {
  const { privacyId } = req.params;
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ message: "Title and description required" });
  }

  // Tekshirib ko‘ramiz, privacy mavjudmi
  const privacy = await prisma.privacy.findUnique({
    where: { id: privacyId },
  });

  if (!privacy) {
    return res.status(404).json({ message: "Privacy not found" });
  }

  const newPolicy = await prisma.policy.create({
    data: {
      title,
      desc,
      privacyId: privacyId,
    },
  });

  res.status(201).json({ message: "Policy created", data: newPolicy });
};

// create desclimer
const createDisclaimerItem = async (req, res) => {
  const { privacyId } = req.params;
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ message: "Title and description required" });
  }

  // Tekshiramiz: privacy mavjudmi
  const privacy = await prisma.privacy.findUnique({
    where: { id: privacyId },
  });

  if (!privacy) {
    return res.status(404).json({ message: "Privacy not found" });
  }

  const newDisclaimer = await prisma.disclaimer.create({
    data: {
      title,
      desc,
      privacyId: privacyId,
    },
  });

  res.status(201).json({ message: "Disclaimer created", data: newDisclaimer });
};


// Get 
const getPrivacyData = async (req, res) => {
  const data = await prisma.privacy.findMany({
    include: { policy: true, disclaimer: true },
  });
  if (!data.length) return res.status(404).json({ message: "No privacy data found" });
  res.status(200).json(data);
};


// Update
const updatePolicy = async (req, res) => {
  const { id } = req.params;
  const old = await prisma.policy.findUnique({ where: { id:id } });
  if (!old) return res.status(404).json({ message: "Policy not found" });

  const { title, desc } = req.body;
  const updated = await prisma.policy.update({
    where: { id: id },
    data: {
      title: title || old.title,
      desc: desc || old.desc,
    },
  });
  res.status(200).json({ message: "Policy updated", data: updated });
};


// Delete
const deletePolicy = async (req, res) => {
  const { id } = req.params;
  await prisma.policy.delete({ where: { id: id } });
  res.status(200).json({ message: "Policy deleted" });
};

// UPdate Desclimenir
const updateDisclaimer = async (req, res) => {
  const { id } = req.params;
  const old = await prisma.disclaimer.findUnique({ where: { id: id } });
  if (!old) return res.status(404).json({ message: "Disclaimer not found" });

  const { title, desc } = req.body;
  const updated = await prisma.disclaimer.update({
    where: { id: id },
    data: {
      title: title || old.title,
      desc: desc || old.desc,
    },
  });
  res.status(200).json({ message: "Disclaimer updated", data: updated });
};


const deleteDisclaimer = async (req, res) => {
  const { id } = req.params;
  await prisma.disclaimer.delete({ where: { id: id } });
  res.status(200).json({ message: "Disclaimer deleted" });
};


module.exports = {
  getDataHome,
  createDataHome,
  updateDataHome,
  deleteHomeData,
  createAboutData,
  getAboutData,
  updateAboutData,
  deleteAboutData,
  createContactData,
  getContactData,
  updateContactData,
  deleteContactData,
  createBlogData,
  getBlogData,
  updateBlogCard,
  deleteBlogCard,
  createPrivacyData,
  createPolicyItem,
  createDisclaimerItem,
  getPrivacyData,
  updatePolicy,
  deletePolicy,
  updateDisclaimer,
  deleteDisclaimer
};