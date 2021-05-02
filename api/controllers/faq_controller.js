const Faq = require('../models/faq_model');

exports.load_all = async (req, res)=>{
    try{
        const AllFaqs = await Faq.find();
        res.status(200).json(AllFaqs);
    } catch(err){
        res.status(400).json({message:err});
    };
};

exports.load_cat = async (req, res)=>{
    const{cat_id} = req.params;
    try {
        const CatFaqs = await Faq.find({cat_id});
        res.status(200).json(CatFaqs);
        
    } catch (err) {
        res.status(400).json({message:err});
    }
}

exports.post_faq = async (req, res)=>{
    const {cat_id , question, answer} = req.body;
    if(!cat_id || !question || !answer){
        res.status(400).json({message:"Please fill up all the fields"});
    };
    const faq = new Faq({
        cat_id,
        question,
        answer
    });

    const savedFaq = await faq.save();
    res.status(200).json(savedFaq);
}

// drinks break