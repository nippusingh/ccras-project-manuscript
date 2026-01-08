
const db = require('../db');

exports.requestApproval = async (req, res) => {
  const { id } = req.params;
  const { journalName, apcRequired, apcAmount } = req.body;
  try {
    await db.query(
      'UPDATE manuscripts SET status = $1, apc_required = $2, apc_amount = $3 WHERE id = $4',
      ['Approval Requested', apcRequired, apcAmount, id]
    );
    res.status(200).json({ message: 'Approval request submitted to HQ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
