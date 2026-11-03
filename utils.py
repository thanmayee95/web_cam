def calculate_attention_score(focus_frames, total_frames):
    """Calculate the attention score as a percentage."""
    if total_frames == 0:
        return 100.0
    return (focus_frames / total_frames) * 100