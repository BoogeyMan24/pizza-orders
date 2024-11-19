import { redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase } }) {

	const [ordersRes, paidRes] = await Promise.all([
		supabase
			.from("orders")
			.select("*")
			.eq("order_id", params.orderid)
			.single(),
		supabase
			.from("paid_orders")
			.select("*")
			.eq("order_id", params.orderid)
			.single()
	]);

	if (ordersRes.error || paidRes.error) {
		console.log("order", ordersRes);
		console.log("paid", paidRes);
		redirect(303, "/order");
	}

	return {
		order: {...ordersRes.data, ...paidRes.data},
	};
}